const mongoose = require('mongoose');
// Make sure to import your Problem model correctly
// Assuming your model is in './models/Problem.js'
const Problem = require('../models/Problem');

// --- Configuration ---
// Replace with your MongoDB connection string
const MONGO_URI = "mongodb://localhost:27017/Geekcode";

// --- Problems Data ---
const problems = [
    // ==================================================
    //                  EASY PROBLEMS (1)
    // ==================================================
    {
        title: "Valid Palindrome",
        description: `A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string \`s\`, return \`true\` if it is a palindrome, or \`false\` otherwise.`,
        difficulty: "Easy",
        category: "Two Pointers",
        prerequisites: ["Two Pointers", "String Manipulation", "Character Validation"],
        starterCode: {
            Cpp: `class Solution {
public:
    bool isPalindrome(string s) {
        // Your code here
        return false;
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isPalindrome(s) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def isPalindrome(self, s):
        # Your code here
        pass`
        },
        testCases: [
            { input: ["A man, a plan, a canal: Panama"], output: true },
            { input: ["race a car"], output: false },
            { input: [" "], output: true },
            { input: ["Madam"], output: true },
            { input: ["No 'x' in Nixon"], output: true }
        ],
        functionMetadata: {
            name: "isPalindrome",
            parameters: [
                { name: "s", type: "string" }
            ]
        }
    },
    // ==================================================
    //                  MEDIUM PROBLEMS (3)
    // ==================================================
    {
        title: "Two Sum II - Input Array Is Sorted",
        description: `Given a **1-indexed** array of integers \`numbers\` that is already **sorted in non-decreasing order**, find two numbers such that they add up to a specific \`target\` number. Let these two numbers be \`numbers[index1]\` and \`numbers[index2]\` where \`1 <= index1 < index2 <= numbers.length\`.

Return the indices of the two numbers, \`index1\` and \`index2\`, **added by one** as an integer array \`[index1, index2]\` of length 2.

The tests are generated such that there is **exactly one solution**. You **may not** use the same element twice.

Your solution must use only constant extra space.`,
        difficulty: "Medium",
        category: "Two Pointers",
        prerequisites: ["Two Pointers", "Sorted Array", "Binary Search"],
        starterCode: {
            Cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        // Your code here
        return {};
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {number[]} numbers
     * @param {number} target
     * @return {number[]}
     */
    twoSum(numbers, target) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def twoSum(self, numbers, target):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[2, 7, 11, 15], 9], output: [1, 2] },
            { input: [[2, 3, 4], 6], output: [1, 3] },
            { input: [[-1, 0], -1], output: [1, 2] },
            { input: [[1, 2, 3, 4, 4, 9, 56, 90], 8], output: [4, 5] }
        ],
        functionMetadata: {
            name: "twoSum",
            parameters: [
                { name: "numbers", type: "array" },
                { name: "target", type: "number" }
            ]
        }
    },
    {
        title: "3Sum",
        description: `Given an integer array \`nums\`, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.

Notice that the solution set must not contain duplicate triplets.`,
        difficulty: "Medium",
        category: "Two Pointers",
        prerequisites: ["Two Pointers", "Sorting", "Hash Set", "Duplicate Handling"],
        starterCode: {
            Cpp: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        // Your code here
        return {};
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    threeSum(nums) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def threeSum(self, nums):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[-1, 0, 1, 2, -1, -4]], output: [[-1, -1, 2], [-1, 0, 1]] },
            { input: [[0, 1, 1]], output: [] },
            { input: [[0, 0, 0]], output: [[0, 0, 0]] },
            { input: [[-2, 0, 1, 1, 2]], output: [[-2, 0, 2], [-2, 1, 1]] }
        ],
        functionMetadata: {
            name: "threeSum",
            parameters: [
                { name: "nums", type: "array" }
            ]
        }
    },
    {
        title: "Container With Most Water",
        description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`i\`-th line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

**Notice** that you may not slant the container.`,
        difficulty: "Medium",
        category: "Two Pointers",
        prerequisites: ["Two Pointers", "Greedy Algorithm", "Area Calculation"],
        starterCode: {
            Cpp: `class Solution {
public:
    int maxArea(vector<int>& height) {
        // Your code here
        return 0;
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {number[]} height
     * @return {number}
     */
    maxArea(height) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def maxArea(self, height):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], output: 49 },
            { input: [[1, 1]], output: 1 },
            { input: [[4, 3, 2, 1, 4]], output: 16 },
            { input: [[1, 2, 1]], output: 2 }
        ],
        functionMetadata: {
            name: "maxArea",
            parameters: [
                { name: "height", type: "array" }
            ]
        }
    },
    // ==================================================
    //                   HARD PROBLEM (1)
    // ==================================================
    {
        title: "Trapping Rain Water",
        description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.`,
        difficulty: "Hard",
        category: "Two Pointers",
        prerequisites: ["Two Pointers", "Dynamic Programming", "Stack", "Prefix/Suffix Arrays"],
        starterCode: {
            Cpp: `class Solution {
public:
    int trap(vector<int>& height) {
        // Your code here
        return 0;
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {number[]} height
     * @return {number}
     */
    trap(height) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def trap(self, height):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], output: 6 },
            { input: [[4, 2, 0, 3, 2, 5]], output: 9 },
            { input: [[3, 0, 2, 0, 4]], output: 7 },
            { input: [[2, 0, 2]], output: 2 },
            { input: [[5, 4, 1, 2]], output: 1 }
        ],
        functionMetadata: {
            name: "trap",
            parameters: [
                { name: "height", type: "array" }
            ]
        }
    }
];

// --- Seeding Function ---
const seedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connection successful. 👍");

        // Clear existing two pointers problems (optional - remove this if you want to keep existing data)
        console.log("Clearing existing Two Pointers problems...");
        await Problem.deleteMany({ category: "Two Pointers" });

        console.log("Seeding new Two Pointers problems...");
        await Problem.insertMany(problems);
        console.log(`Successfully seeded ${problems.length} Two Pointers problems! 🌱`);

        // Display seeded problems summary
        console.log("\n📊 Seeded Problems Summary:");
        console.log("Easy: 1 problem");
        console.log("Medium: 3 problems");
        console.log("Hard: 1 problem");
        console.log("Total: 5 problems");

        console.log("\n📋 Problems Added:");
        problems.forEach((problem, index) => {
            console.log(`${index + 1}. ${problem.title} (${problem.difficulty})`);
        });

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