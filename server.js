const express = require('express');
const mongoose = require('mongoose');
const {client, startRedis} = require('./redisClient');
const Problem = require('./models/Problem');
const Submission = require('./models/Submission');

mongoose.connect('mongodb://localhost:27017/Geekcode')


async function startServer(){
    const app = express(); 
    app.use(express.json());

    await startRedis();

    app.get('/', (req, res) => {
        res.send("hello");
    })

    app.get('/api/problems', async (req, res) => {
        let problems = [];

        try{
            problems = await Problem.find();
            console.log(`${problems}`);
        }catch(e) {
            console.log(`${e.message}`);
            res.status(500).send({ error: "Failed to fetch problems"});
        }

        res.send(problems);
    })

    app.get('/api/problems/:id', async (req, res) => {
        const id = req.params.id;
        let problem = {};
        try{
            problem = await Problem.findById(id);
            console.log(`${problem}`);
        }catch(e) {
           return res.status(500).send({error: "Problem not found"});
        }
        res.send(problem);
    })

    app.post('/api/submissions', async (req, res) => {
        try{
            const {problemId, language, code, status, output, submittedAt} = req.body;

            if(!problemId || !language || !code || !status) {
                return res.status(400).send({ error: "Incomplete submission data"});
            }

            const submission = new Submission({
                problemId,
                language,
                code,
                status,
                output,
                submittedAt
            })

            const newSubmission = await submission.save();

            await client.lPush('jobQueue', newSubmission.id);

            return res.status(201).send(newSubmission);
        }catch(err) {
            console.log(err)
            return res.status(400).send({error: `Failed to save submission: ${err.message}`});
        }
    })

    app.listen(3000, () => console.log("server running on port 3000"));
}


startServer();