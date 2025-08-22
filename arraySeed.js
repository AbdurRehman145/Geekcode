const mongoose = require('mongoose');
// Make sure to import your Problem model correctly
// Assuming your model is in './models/Problem.js'
const Problem = require('./models/Problem');

// --- Configuration ---
// Replace with your MongoDB connection string
const MONGO_URI = "mongodb://localhost:27017/Geekcode";

// --- Problems Data ---
const problems = [
    // ==================================================
    //                  EASY PROBLEMS (2)
    // ==================================================
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
    // ==================================================
    //                  MEDIUM PROBLEMS (2)
    // ==================================================
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
        title: "Container With Most Water",
        description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`i\`-th line are \`(i, 0)\` and \`(i, height[i])\`. Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.`,
        difficulty: "Medium",
        category: "Array",
        prerequisites: ["Two Pointers", "Greedy Algorithm"],
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
            { input: [[1, 1]], output: 1 }
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
        category: "Array",
        prerequisites: ["Two Pointers", "Dynamic Programming", "Stack"],
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
            { input: [[3, 0, 2, 0, 4]], output: 7 }
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

        // Clear existing problems (optional - remove this if you want to keep existing data)
        console.log("Clearing existing problems...");
        await Problem.deleteMany({ category: "Array" });

        console.log("Seeding new array problems...");
        await Problem.insertMany(problems);
        console.log(`Successfully seeded ${problems.length} array problems! 🌱`);

        // Display seeded problems summary
        console.log("\n📊 Seeded Problems Summary:");
        console.log("Easy: 2 problems");
        console.log("Medium: 2 problems");
        console.log("Hard: 1 problem");
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