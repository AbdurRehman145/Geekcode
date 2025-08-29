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
    //                  MEDIUM PROBLEMS (5)
    // ==================================================
    {
        title: "Subsets",
        description: `Given an integer array \`nums\` of **unique** elements, return all possible subsets (the power set).

The solution set **must not** contain duplicate subsets. Return the solution in **any order**.`,
        difficulty: "Medium",
        category: "Backtracking",
        prerequisites: ["Backtracking", "Recursion", "Bit Manipulation", "Power Set"],
        starterCode: {
            Cpp: `class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        // Your code here
        return {};
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    subsets(nums) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def subsets(self, nums):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[1, 2, 3]], output: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]] },
            { input: [[0]], output: [[], [0]] },
            { input: [[1, 2]], output: [[], [1], [2], [1, 2]] },
            { input: [[4, 1, 0]], output: [[], [4], [1], [4, 1], [0], [4, 0], [1, 0], [4, 1, 0]] }
        ],
        functionMetadata: {
            name: "subsets",
            parameters: [
                { name: "nums", type: "array" }
            ]
        }
    },
    {
        title: "Combination Sum",
        description: `Given an array of **distinct** integers \`candidates\` and a target integer \`target\`, return a list of all **unique combinations** of \`candidates\` where the chosen numbers sum to \`target\`. You may return the combinations in **any order**.

The **same** number may be chosen from \`candidates\` an **unlimited number of times**. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

The test cases are generated such that the number of unique combinations that sum up to \`target\` is less than 150 combinations for the given input.`,
        difficulty: "Medium",
        category: "Backtracking",
        prerequisites: ["Backtracking", "Recursion", "Dynamic Programming", "Combination Generation"],
        starterCode: {
            Cpp: `class Solution {
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        // Your code here
        return {};
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {number[]} candidates
     * @param {number} target
     * @return {number[][]}
     */
    combinationSum(candidates, target) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def combinationSum(self, candidates, target):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[2, 3, 6, 7], 7], output: [[2, 2, 3], [7]] },
            { input: [[2, 3, 5], 8], output: [[2, 2, 2, 2], [2, 3, 3], [3, 5]] },
            { input: [[2], 1], output: [] },
            { input: [[1], 1], output: [[1]] }
        ],
        functionMetadata: {
            name: "combinationSum",
            parameters: [
                { name: "candidates", type: "array" },
                { name: "target", type: "number" }
            ]
        }
    },
    {
        title: "Combination Sum II",
        description: `Given a collection of candidate numbers (\`candidates\`) and a target number (\`target\`), find all unique combinations in \`candidates\` where the candidate numbers sum to \`target\`.

Each number in \`candidates\` may only be used **once** in the combination.

**Note:** The solution set must not contain duplicate combinations.`,
        difficulty: "Medium",
        category: "Backtracking",
        prerequisites: ["Backtracking", "Recursion", "Sorting", "Duplicate Handling"],
        starterCode: {
            Cpp: `class Solution {
public:
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        // Your code here
        return {};
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {number[]} candidates
     * @param {number} target
     * @return {number[][]}
     */
    combinationSum2(candidates, target) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def combinationSum2(self, candidates, target):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[10, 1, 2, 7, 6, 1, 5], 8], output: [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]] },
            { input: [[2, 5, 2, 1, 2], 5], output: [[1, 2, 2], [5]] },
            { input: [[1], 1], output: [[1]] },
            { input: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 27], output: [] }
        ],
        functionMetadata: {
            name: "combinationSum2",
            parameters: [
                { name: "candidates", type: "array" },
                { name: "target", type: "number" }
            ]
        }
    },
    {
        title: "Subsets II",
        description: `Given an integer array \`nums\` that may contain duplicates, return all possible subsets (the power set).

The solution set **must not** contain duplicate subsets. Return the solution in **any order**.`,
        difficulty: "Medium",
        category: "Backtracking",
        prerequisites: ["Backtracking", "Recursion", "Sorting", "Duplicate Handling", "Power Set"],
        starterCode: {
            Cpp: `class Solution {
public:
    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        // Your code here
        return {};
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    subsetsWithDup(nums) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def subsetsWithDup(self, nums):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[1, 2, 2]], output: [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]] },
            { input: [[0]], output: [[], [0]] },
            { input: [[4, 4, 4, 1, 4]], output: [[], [1], [1, 4], [1, 4, 4], [1, 4, 4, 4], [1, 4, 4, 4, 4], [4], [4, 4], [4, 4, 4], [4, 4, 4, 4]] },
            { input: [[1, 1]], output: [[], [1], [1, 1]] }
        ],
        functionMetadata: {
            name: "subsetsWithDup",
            parameters: [
                { name: "nums", type: "array" }
            ]
        }
    },
    {
        title: "Permutations",
        description: `Given an array \`nums\` of distinct integers, return all the possible permutations. You can return the answer in **any order**.`,
        difficulty: "Medium",
        category: "Backtracking",
        prerequisites: ["Backtracking", "Recursion", "Permutation Generation", "Swap Technique"],
        starterCode: {
            Cpp: `class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        // Your code here
        return {};
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    permute(nums) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def permute(self, nums):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[1, 2, 3]], output: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]] },
            { input: [[0, 1]], output: [[0, 1], [1, 0]] },
            { input: [[1]], output: [[1]] },
            { input: [[1, 2]], output: [[1, 2], [2, 1]] }
        ],
        functionMetadata: {
            name: "permute",
            parameters: [
                { name: "nums", type: "array" }
            ]
        }
    }
];

// --- Seeding Function ---
const seedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connection successful. 👍");

        // Clear existing backtracking problems (optional - remove this if you want to keep existing data)
        console.log("Clearing existing Backtracking problems...");
        await Problem.deleteMany({ category: "Backtracking" });

        console.log("Seeding new Backtracking problems...");
        await Problem.insertMany(problems);
        console.log(`Successfully seeded ${problems.length} Backtracking problems! 🌱`);

        // Display seeded problems summary
        console.log("\n📊 Seeded Problems Summary:");
        console.log("Easy: 0 problems");
        console.log("Medium: 5 problems");
        console.log("Hard: 0 problems");
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