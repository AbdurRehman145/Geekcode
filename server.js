const express = require('express');
const mongoose = require('mongoose');
const Problem = require('./models/Problem');
const Submission = require('./models/Submission');

mongoose.connect('mongodb://localhost:27017/');

const app = express();


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
    //const id = req.params.id;
    let problem = {};
    try{
        problem = await Problem.find().where('_id').equals(req.params.id);
        console.log(`${problem}`);
    }catch(e) {
        res.status(500).send({error: "Problem not found"});
    }
    res.send(problem);
})

app.listen(3000, () => console.log("server running on port 3000"));

