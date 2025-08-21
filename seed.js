const mongoose = require('mongoose');
const Problem = require('./models/Problem');
const Submission = require('./models/Submission');

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/Geekcode');
        console.log('Connected to MongoDB');

        // Clear existing data
        await Problem.deleteMany({});
        await Submission.deleteMany({});
        console.log('Cleared existing data');
        const pythonStarterCode = `
class Solution:
    def twoSum(self, nums, target):
        # Your code here
        pass
`;

// JAVASCRIPT STARTER CODE  
const javascriptStarterCode = `
class Solution {
    twoSum(nums, target) {
        // Your code here
    }
}
`;

// C++ STARTER CODE
const cppStarterCode = `
class Solution {
public:
    vector<int> solve(vector<int>& nums, int target) {
        // Your code here
        return {};
    }
};
`;


        // Sample problems data
        const problems = [
            {
                title: "Two Sum",
                description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
                difficulty: "Easy",
                category: "Array",
                prerequisites: ["Hash Table", "Array"],
                starterCode: {
                    Python: pythonStarterCode.trim(),
                    Javascript: javascriptStarterCode.trim(),
                    Cpp: cppStarterCode.trim()
                },
                testCases: [
                    {
                        input: [[2, 7, 11, 15], 9],
                        output: [0, 1]
                    },
                    {
                        input: [[3, 2, 4], 6],
                        output: [1, 2]
                    },
                    {
                        input: [[3, 3], 6],
                        output: [0, 1]
                    }
                ]
            }
        ];

        // Insert problems
        const insertedProblems = await Problem.insertMany(problems);
        console.log(`Inserted ${insertedProblems.length} problems`);

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
}

// Run the seeder
seedDatabase();