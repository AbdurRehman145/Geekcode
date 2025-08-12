const redis = require('redis');
const mongoose = require('mongoose');
const {exec} = require('child_process');
const fs = require('fs');
const path = require('path');

const Problem = require('./models/Problem');
const Submission = require('./models/Submission');

class CodeExecutionWorket {
    constructor(){
        this.redisClient = redis.createClient({
            host: 'localhost',
            port: 6379
        });

        mongoose.connect('mongodb://localhost:27017/Geekcode');

        this.tempDir = path.join(__dirname, 'temp');
        if(!fs.existsSync(temDir)){
            fs.mkdirSync(tempDir);
        }
    }

    async start(){
        console.log("Worker started and waiting for jobs");

        while(true){
            try{
                const submissionId = await this.redisClient.brPop('jobQueue', 0);
                if(submissionId && submissionId[1]){
                    await this.processSubmission(submissionId);
                }
            } catch(err) {
                console.log(`Error in worker loop: ${err.message}`)
                await this.sleep(5000);
            }
        }
    }

    async processSubmission(submissionId){
        try{
            await Submission.findByIdAndUpdate(submissionId, {
                status: 'Processing'
            });

            const submission = await Submission.findById(submissionId);
            if(!submission){
                throw new Error("Submission not found");
            }

            const problem = await Problem.findById(submission.problemId);
            if(!problem){
                throw new Error("Problem not found");
            }

            const result = await this.executeCode(submission, problem);

            await Submission.findByIdAndUpdate(submissionId, {
                status: result.status,
                output: result.output
            });

        }catch(err) {
            console.log(`Error processing submission: ${err}`);

            await Submission.findByIdAndUpdate(submissionId, {
                status: 'Error',
                output: err.message
            })
        }
    }

}
