const express = require('express');
const mongoose = require('mongoose');
const Problem = require('./models/Problem');
const Submission = require('./models/Submission');


const sampleProblems = [
    {
        title: "Two Sum",
        description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
        difficulty: "Easy",
        category: "Arrays",
        prerequisites: ["Hash Maps"],
        starterCode: {
            Cpp: `class Solution {\npublic:\n\tvector<int> twoSum(vector<int>& nums, int target) {\n\t\t// Your code here\n\t}\n};`,
            Javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    // Your code here\n};`,
            Python: `class Solution(object):\n\tdef twoSum(self, nums, target):\n\t\t# Your code here`
        },
        testCases: {
            input: "nums = [2,7,11,15], target = 9",
            output: "[0,1]"
        }
    },
    {
        title: "Palindrome Number",
        description: "Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.",
        difficulty: "Easy",
        category: "Math",
        prerequisites: ["String Manipulation"],
        starterCode: {
            Javascript: `/**\n * @param {number} x\n * @return {boolean}\n */\nvar isPalindrome = function(x) {\n    // Your code here\n};`
        },
        testCases: {
            input: "x = 121",
            output: "true"
        }
    },
    {
        title: "Median of Two Sorted Arrays",
        description: "Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays.",
        difficulty: "Hard",
        category: "Arrays",
        prerequisites: ["Binary Search", "Divide and Conquer"],
        starterCode: {
            Python: `class Solution(object):\n\tdef findMedianSortedArrays(self, nums1, nums2):\n\t\t# Your code here`
        },
        testCases: {
            input: "nums1 = [1,3], nums2 = [2]",
            output: "2.00000"
        }
    }
];

async function seedDatabase() {
  
    const MONGO_URI = "mongodb://localhost:27017/Geekcode";

    try {
        // Connect to the database
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB connection successful.");

        // Clear existing data
        console.log("🧹 Clearing old data...");
        await Problem.deleteMany({});
        await Submission.deleteMany({});
        console.log("Data cleared.");

        // Insert new problems
        console.log("🌱 Seeding problems...");
        const createdProblems = await Problem.insertMany(sampleProblems);
        console.log(`${createdProblems.length} problems created.`);

        // Create submissions that reference the new problems
        const sampleSubmissions = [
            {
                problemId: createdProblems[0]._id, // Refers to "Two Sum"
                language: "Javascript",
                code: `var twoSum = function(nums, target) { /* ... implementation ... */ };`,
                status: "Accepted"
            },
            {
                problemId: createdProblems[0]._id, // Another submission for "Two Sum"
                language: "Python",
                code: `class Solution:\n\tdef twoSum(self, nums, target):\n\t\t# Incomplete\n\t\tpass`,
                status: "Wrong Answer"
            },
            {
                problemId: createdProblems[2]._id, // Refers to "Median of Two Sorted Arrays"
                language: "Python",
                code: `class Solution(object):\n\tdef findMedianSortedArrays(self, nums1, nums2):\n\t\t# Some code here\n\t\treturn 2.0`,
                status: "Time Limit Exceeded",
                output: "Execution timed out"
            },
        ];

        // Insert new submissions
        console.log("🌱 Seeding submissions...");
        const createdSubmissions = await Submission.insertMany(sampleSubmissions);
        console.log(`${createdSubmissions.length} submissions created.`);

        console.log("\nDatabase seeded successfully! 🎉");

    } catch (error) {
        console.error("❌ Error seeding database:", error);
    } finally {
        // Disconnect from the database
        await mongoose.disconnect();
        console.log("🔌 MongoDB disconnected.");
    }
}

// --- 4. RUN THE SCRIPT ---
seedDatabase();
