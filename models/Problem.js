const mongoose = require('mongoose');

const functionMetadataSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    parameters: [{
        name: { type: String, required: true },
        type: { type: String, required: true }  
    }]
}, { _id: false });

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true,
        enum: ["Easy", "Medium", "Hard"]
    },
    category: {
        type: String,
        required: true
    },
    prerequisites: {
        type: [String],
        required: true
    },
    starterCode: {
        Cpp: String,
        Javascript:  String,
        Python:  String
    },
    testCases: [
        {
            input: mongoose.Schema.Types.Mixed,
            output: mongoose.Schema.Types.Mixed
        }
    ],
    functionMetadata: {
        type: functionMetadataSchema,
        required: true
    }
})


module.exports = mongoose.model('Problem', problemSchema);