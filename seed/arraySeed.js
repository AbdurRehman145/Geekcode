const mongoose = require('mongoose');
// Make sure to import your Problem model correctly
// Assuming your model is in './models/Problem.js'
const Problem = require('../models/Problem');

// --- Configuration ---
// Replace with your MongoDB connection string
const MONGO_URI = "mongodb://localhost:27017/Geekcode";

// --- Problems Data ---
const problems = [
    {
        title: "Two Sum",
        description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`. You may assume that each input would have **exactly one solution**, and you may not use the same element twice. You can return the answer in any order.`,
        difficulty: "Easy",
        category: "Array",
        prerequisites: ["Array Iteration", "Hash Maps"],
        starterCode: {
            Cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your code here
        return {};
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    twoSum(nums, target) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def twoSum(self, nums, target):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[2, 7, 11, 15], 9], output: [0, 1] },
            { input: [[3, 2, 4], 6], output: [1, 2] },
            { input: [[3, 3], 6], output: [0, 1] }
        ],
        functionMetadata: {
            name: "twoSum",
            parameters: [
                { name: "nums", type: "array" },
                { name: "target", type: "number" }
            ]
        }
    },
    {
        title: "Contains Duplicate",
        description: `Given an integer array \`nums\`, return \`true\` if any value appears **at least twice** in the array, and return \`false\` if every element is distinct.`,
        difficulty: "Easy",
        category: "Array",
        prerequisites: ["Array Iteration", "Hash Sets"],
        starterCode: {
            Cpp: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        // Your code here
        return false;
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    containsDuplicate(nums) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def containsDuplicate(self, nums):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[1, 2, 3, 1]], output: true },
            { input: [[1, 2, 3, 4]], output: false },
            { input: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], output: true }
        ],
        functionMetadata: {
            name: "containsDuplicate",
            parameters: [
                { name: "nums", type: "array" }
            ]
        }
    },
    {
        title: "Product of Array Except Self",
        description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`. The product of any prefix or suffix of \`nums\` is **guaranteed** to fit in a **32-bit** integer. You must write an algorithm that runs in O(n) time and without using the division operation.`,
        difficulty: "Medium",
        category: "Array",
        prerequisites: ["Array Iteration", "Prefix/Suffix Products"],
        starterCode: {
            Cpp: `class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        // Your code here
        return {};
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    productExceptSelf(nums) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def productExceptSelf(self, nums):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[1, 2, 3, 4]], output: [24, 12, 8, 6] },
            { input: [[-1, 1, 0, -3, 3]], output: [0, 0, 9, 0, 0] }
        ],
        functionMetadata: {
            name: "productExceptSelf",
            parameters: [
                { name: "nums", type: "array" }
            ]
        }
    },
    {
        title: "Longest Consecutive Sequence",
        description: `Given an unsorted array of integers \`nums\`, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.`,
        difficulty: "Medium",
        category: "Array",
        prerequisites: ["Hash Sets", "Array Iteration", "Sequence Detection"],
        starterCode: {
            Cpp: `class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        // Your code here
        return 0;
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    longestConsecutive(nums) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def longestConsecutive(self, nums):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[100, 4, 200, 1, 3, 2]], output: 4 },
            { input: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]], output: 9 },
            { input: [[]], output: 0 },
            { input: [[9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6]], output: 7 }
        ],
        functionMetadata: {
            name: "longestConsecutive",
            parameters: [
                { name: "nums", type: "array" }
            ]
        }
    },
    {
        title: "Valid Anagram",
        description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise. An **anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
        difficulty: "Easy",
        category: "Array",
        prerequisites: ["Hash Maps", "String Manipulation", "Character Counting"],
        starterCode: {
            Cpp: `class Solution {
public:
    bool isAnagram(string s, string t) {
        // Your code here
        return false;
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    isAnagram(s, t) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def isAnagram(self, s, t):
        # Your code here
        pass`
        },
        testCases: [
            { input: ["anagram", "nagaram"], output: true },
            { input: ["rat", "car"], output: false },
            { input: ["listen", "silent"], output: true },
            { input: ["hello", "bello"], output: false },
            { input: ["a", "ab"], output: false }
        ],
        functionMetadata: {
            name: "isAnagram",
            parameters: [
                { name: "s", type: "string" },
                { name: "t", type: "string" }
            ]
        }
    }
];

// --- Seeding Function ---
const seedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connection successful. 👍");

        // Clear existing problems (optional - remove this if you want to keep existing data)
        console.log("Clearing existing problems...");
        await Problem.deleteMany({ category: "Array" });

        console.log("Seeding new array problems...");
        await Problem.insertMany(problems);
        console.log(`Successfully seeded ${problems.length} array problems! 🌱`);

        // Display seeded problems summary
        console.log("\n📊 Seeded Problems Summary:");
        console.log("Easy: 3 problems");
        console.log("Medium: 2 problems");
        console.log("Total: 5 problems");

    } catch (error) {
        console.error("Error seeding database: ", error);
    } finally {
        // Close the connection
        await mongoose.connection.close();
        console.log("MongoDB connection closed. 👋");
    }
};

// --- Execute Seeding ---
seedDB();