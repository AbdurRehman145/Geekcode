const redis = require('redis');
const mongoose = require('mongoose');
const {exec} = require('child_process');
const fs = require('fs');
const path = require('path');

const Problem = require('../models/Problem');
const Submission = require('../models/Submission');

class CodeExecutionWorker {
    constructor(){
        this.redisClient = redis.createClient();

        this.redisClient.on('error', (err) => {
            console.log(`Redis client error: ${err}`);
        });

        this.redisClient.on('connect', () => {
            console.log('Worker connected to Redis');
        });

        this.redisClient.connect();

        mongoose.connect('mongodb://localhost:27017/Geekcode');

        this.tempDir = path.join(__dirname, 'temp');
        if(!fs.existsSync(this.tempDir)){
            fs.mkdirSync(this.tempDir);
        }
    }
    async start(){

        if (!this.redisClient.isOpen) {
            await this.redisClient.connect();
            console.log("Worker connected to Redis");
        }
        console.log("Worker started and waiting for jobs");

        while(true){
            try{
                const submissionId = await this.redisClient.blPop('jobQueue', 0);
                if(submissionId && submissionId.element){
                    console.log(`Received job: ${submissionId.element}`);
                    await this.processSubmission(submissionId.element);
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

    async executeCode(submission, problem){
        const {language, code} = submission;
        const {testCases} = problem;

        try {
            let allPassed = true;
            let outputs = [];

            for(let i = 0; i<testCases.length; i++){
                const testCase = testCases[i];

                console.log(`Running test case ${i+1}/${testCases.length}`);

                const result = await this.runSingleTest(code, language, testCase);

                outputs.push(result.output);

                if(result.status !== 'passed'){
                    allPassed = false;
                    let output = result.output;

                    if(result.status === 'timeout'){
                        return {
                            status: "Time Limit Exceeded",
                            output: outputs
                        };
                    }
                    else {
                        return {
                            status: "Wrong Answer",
                            output: outputs
                        }
                    }
                }
            }

            return {
                status: 'Accepted',
                output: outputs
            }
        } catch(err) {
            return {
                status: 'Error',
                output: err.message
            }
        }

    }

    async runSingleTest(code, language, testCase){
        const dockerImage = this.getDockerImage(language);
        const filename = this.getFileName(language);
        const filePath = path.join(this.tempDir, filename);

        try {

            fs.writeFileSync(filePath, code);
            
            const inputPath = path.join(this.tempDir, 'input.txt');
            fs.writeFileSync(inputPath, testCase.input.toString());

            const dockerCmd = this.buildDockerCommand(dockerImage, language, filename);

            console.log('Running Docker command:', dockerCmd);

            const result = await this.executeWithTimeout(dockerCmd, 5000);

            const actualOutput = result.stdout.trim();
            const expectedOutput = testCase.output.toString().trim();

            if(actualOutput === expectedOutput){
                return{
                    status: 'passed',
                    output: actualOutput
                };
            }
            else {
                return {
                    status: 'failed',
                    output: actualOutput
                };
            }
        } catch(err) {
            if(err.message.includes('timeout')){
                return {
                    status: 'timeout',
                    output: 'Time Limit Exceeded'
                };
            }
            return {
                status: 'error',
                output: err.message
            };
        } finally {
            this.cleanupFiles([filePath, path.join(this.tempDir, 'input.txt')]);
        }
    }

   
    getDockerImage(language) {
        const images = {
            'Python': 'python:3.9-slim',
            'Javascript': 'node:16-slim',
            'Cpp': 'gcc:9'
        };
        return images[language] || 'ubuntu:20.04';
    }

    
    getFileName(language) {
        const extensions = {
            'Python': 'solution.py',
            'Javascript': 'solution.js',
            'Cpp': 'solution.cpp'
        };
        return extensions[language] || 'solution.txt';
    }

    
    buildDockerCommand(dockerImage, language, fileName) {
        const tempDir = this.tempDir;
        
        const commands = {
            'Python': `docker run --rm -v ${tempDir}:/app -w /app ${dockerImage} python ${fileName}`,
            'Javascript': `docker run --rm -v ${tempDir}:/app -w /app ${dockerImage} node ${fileName}`,
            'Cpp': `docker run --rm -v ${tempDir}:/app -w /app ${dockerImage} bash -c "g++ -o solution ${fileName} && ./solution"`
        };
        
        return commands[language] || `docker run --rm -v ${tempDir}:/app -w /app ${dockerImage} cat ${fileName}`;
    }

   
    executeWithTimeout(command, timeout) {
        return new Promise((resolve, reject) => {
            const process = exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(new Error(stderr || error.message));
                } else {
                    resolve({ stdout, stderr });
                }
            });


            setTimeout(() => {
                process.kill('SIGKILL');
                reject(new Error('timeout'));
            }, timeout);
        });
    }

    
    cleanupFiles(filePaths) {
        filePaths.forEach(filePath => {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        });
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}

const worker = new CodeExecutionWorker();
worker.start().catch(console.error);

module.exports = CodeExecutionWorker;