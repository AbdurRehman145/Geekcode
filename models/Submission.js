const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    problemId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Problem',
        required: true
    },
    language: {
        type: String,
        required: true
    },
    code: {
        type: String,
        requred: true
    },
    status: {
        type: String,
        enum: ["Pending", "Processing", "Accepted", "Time Limit Exceeded", "Wrong Answer", "Error"],
        required: true
    },
    output: {
        type: String
    },
    submittedAt:{
        type: Date,
        default: () => new Date()
    }
})

module.exports = mongoose.model('Submission', submissionSchema);