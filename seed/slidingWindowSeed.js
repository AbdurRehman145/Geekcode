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
        title: "Best Time to Buy and Sell Stock",
        description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`ith\` day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return the **maximum profit** you can achieve from this transaction. If you cannot achieve any profit, return \`0\`.`,
        difficulty: "Easy",
        category: "Sliding Window",
        prerequisites: ["Sliding Window", "Array", "Dynamic Programming", "Greedy Algorithm"],
        starterCode: {
            Cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        // Your code here
        return 0;
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {number[]} prices
     * @return {number}
     */
    maxProfit(prices) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def maxProfit(self, prices):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[7, 1, 5, 3, 6, 4]], output: 5 },
            { input: [[7, 6, 4, 3, 1]], output: 0 },
            { input: [[1, 2, 3, 4, 5]], output: 4 },
            { input: [[2, 4, 1]], output: 2 },
            { input: [[1]], output: 0 }
        ],
        functionMetadata: {
            name: "maxProfit",
            parameters: [
                { name: "prices", type: "array" }
            ]
        }
    },
    // ==================================================
    //                  MEDIUM PROBLEMS (3)
    // ==================================================
    {
        title: "Longest Substring Without Repeating Characters",
        description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.`,
        difficulty: "Medium",
        category: "Sliding Window",
        prerequisites: ["Sliding Window", "Hash Table", "String", "Two Pointers"],
        starterCode: {
            Cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        // Your code here
        return 0;
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    lengthOfLongestSubstring(s) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def lengthOfLongestSubstring(self, s):
        # Your code here
        pass`
        },
        testCases: [
            { input: ["abcabcbb"], output: 3 },
            { input: ["bbbbb"], output: 1 },
            { input: ["pwwkew"], output: 3 },
            { input: [""], output: 0 },
            { input: ["dvdf"], output: 3 },
            { input: ["anviaj"], output: 5 }
        ],
        functionMetadata: {
            name: "lengthOfLongestSubstring",
            parameters: [
                { name: "s", type: "string" }
            ]
        }
    },
    {
        title: "Permutation in String",
        description: `Given two strings \`s1\` and \`s2\`, return \`true\` if \`s2\` contains a permutation of \`s1\`, or \`false\` otherwise.

In other words, return \`true\` if one of \`s1\`'s permutations is the substring of \`s2\`.`,
        difficulty: "Medium",
        category: "Sliding Window",
        prerequisites: ["Sliding Window", "Hash Table", "String", "Two Pointers"],
        starterCode: {
            Cpp: `class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        // Your code here
        return false;
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {string} s1
     * @param {string} s2
     * @return {boolean}
     */
    checkInclusion(s1, s2) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def checkInclusion(self, s1, s2):
        # Your code here
        pass`
        },
        testCases: [
            { input: ["ab", "eidbaooo"], output: true },
            { input: ["ab", "eidboaoo"], output: false },
            { input: ["adc", "dcda"], output: true },
            { input: ["abc", "bbbca"], output: true },
            { input: ["hello", "ooolleoooleh"], output: false }
        ],
        functionMetadata: {
            name: "checkInclusion",
            parameters: [
                { name: "s1", type: "string" },
                { name: "s2", type: "string" }
            ]
        }
    },
    {
        title: "Sliding Window Maximum",
        description: `You are given an array of integers \`nums\`, there is a sliding window of size \`k\` which is moving from the very left of the array to the very right. You can only see the \`k\` numbers in the window. Each time the sliding window moves right by one position.

Return the **max sliding window**.`,
        difficulty: "Hard",
        category: "Sliding Window",
        prerequisites: ["Sliding Window", "Queue", "Array", "Heap (Priority Queue)", "Monotonic Queue"],
        starterCode: {
            Cpp: `class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        // Your code here
        return {};
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    maxSlidingWindow(nums, k) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def maxSlidingWindow(self, nums, k):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[1, 3, -1, -3, 5, 3, 6, 7], 3], output: [3, 3, 5, 5, 6, 7] },
            { input: [[1], 1], output: [1] },
            { input: [[1, -1], 1], output: [1, -1] },
            { input: [[9, 11], 2], output: [11] },
            { input: [[4, -2, -3, 4, -1, -2, 1, 5, -3], 2], output: [4, -2, 4, 4, -1, 1, 5, 5] }
        ],
        functionMetadata: {
            name: "maxSlidingWindow",
            parameters: [
                { name: "nums", type: "array" },
                { name: "k", type: "number" }
            ]
        }
    },
    // ==================================================
    //                   HARD PROBLEM (1)
    // ==================================================
    {
        title: "Minimum Window Substring",
        description: `Given two strings \`s\` and \`t\` of lengths \`m\` and \`n\` respectively, return the **minimum window substring** of \`s\` such that every character in \`t\` (including duplicates) is included in the window. If there is no such substring, return the empty string \`""\`.

The testcases will be generated such that the answer is **unique**.`,
        difficulty: "Hard",
        category: "Sliding Window",
        prerequisites: ["Sliding Window", "Hash Table", "String", "Two Pointers"],
        starterCode: {
            Cpp: `class Solution {
public:
    string minWindow(string s, string t) {
        // Your code here
        return "";
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {string}
     */
    minWindow(s, t) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def minWindow(self, s, t):
        # Your code here
        pass`
        },
        testCases: [
            { input: ["ADOBECODEBANC", "ABC"], output: "BANC" },
            { input: ["a", "a"], output: "a" },
            { input: ["a", "aa"], output: "" },
            { input: ["ab", "b"], output: "b" },
            { input: ["bba", "ab"], output: "ba" }
        ],
        functionMetadata: {
            name: "minWindow",
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

        // Clear existing sliding window problems (optional - remove this if you want to keep existing data)
        console.log("Clearing existing Sliding Window problems...");
        await Problem.deleteMany({ category: "Sliding Window" });

        console.log("Seeding new Sliding Window problems...");
        await Problem.insertMany(problems);
        console.log(`Successfully seeded ${problems.length} Sliding Window problems! 🌱`);

        // Display seeded problems summary
        console.log("\n📊 Seeded Problems Summary:");
        console.log("Easy: 1 problem");
        console.log("Medium: 2 problems");
        console.log("Hard: 2 problems");
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