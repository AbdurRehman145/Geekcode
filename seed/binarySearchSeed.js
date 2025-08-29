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
    //                  EASY PROBLEM (1)
    // ==================================================
    {
        title: "Binary Search",
        description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
        difficulty: "Easy",
        category: "Binary Search",
        prerequisites: ["Array", "Binary Search", "Divide and Conquer"],
        starterCode: {
            Cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        // Your code here
        return -1;
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    search(nums, target) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def search(self, nums, target):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[-1, 0, 3, 5, 9, 12], 9], output: 4 },
            { input: [[-1, 0, 3, 5, 9, 12], 2], output: -1 },
            { input: [[5], 5], output: 0 },
            { input: [[1, 2, 3, 4, 5], 3], output: 2 },
            { input: [[2, 5], 2], output: 0 }
        ],
        functionMetadata: {
            name: "search",
            parameters: [
                { name: "nums", type: "array" },
                { name: "target", type: "number" }
            ]
        }
    },
    // ==================================================
    //                  MEDIUM PROBLEMS (3)
    // ==================================================
    {
        title: "Koko Eating Bananas",
        description: `Koko loves to eat bananas. There are \`n\` piles of bananas, the \`i-th\` pile has \`piles[i]\` bananas. The guards have gone and will come back in \`h\` hours.

Koko can decide her bananas-per-hour eating speed of \`k\`. Each hour, she chooses some pile of bananas and eats \`k\` bananas from that pile. If the pile has less than \`k\` bananas, she eats all of them instead and will not eat any more bananas during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards come back.

Return the minimum integer \`k\` such that she can eat all the bananas within \`h\` hours.`,
        difficulty: "Medium",
        category: "Binary Search",
        prerequisites: ["Binary Search", "Array", "Math"],
        starterCode: {
            Cpp: `class Solution {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        // Your code here
        return 0;
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {number[]} piles
     * @param {number} h
     * @return {number}
     */
    minEatingSpeed(piles, h) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def minEatingSpeed(self, piles, h):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[3, 6, 7, 11], 8], output: 4 },
            { input: [[30, 11, 23, 4, 20], 5], output: 30 },
            { input: [[30, 11, 23, 4, 20], 6], output: 23 },
            { input: [[1, 1, 1, 999999999], 10], output: 142857143 },
            { input: [[312884470], 312884469], output: 2 }
        ],
        functionMetadata: {
            name: "minEatingSpeed",
            parameters: [
                { name: "piles", type: "array" },
                { name: "h", type: "number" }
            ]
        }
    },
    {
        title: "Find Minimum in Rotated Sorted Array",
        description: `Suppose an array of length \`n\` sorted in ascending order is **rotated** between \`1\` and \`n\` times. For example, the array \`nums = [0,1,2,4,5,6,7]\` might become:

- \`[4,5,6,7,0,1,2]\` if it was rotated \`4\` times.
- \`[0,1,2,4,5,6,7]\` if it was rotated \`7\` times.

Notice that **rotating** an array \`[a[0], a[1], a[2], ..., a[n-1]]\` 1 time results in the array \`[a[n-1], a[0], a[1], a[2], ..., a[n-2]]\`.

Given the sorted rotated array \`nums\` of **unique** elements, return the minimum element of this array.

You must write an algorithm that runs in \`O(log n)\` time.`,
        difficulty: "Medium",
        category: "Binary Search",
        prerequisites: ["Binary Search", "Array", "Rotated Array"],
        starterCode: {
            Cpp: `class Solution {
public:
    int findMin(vector<int>& nums) {
        // Your code here
        return 0;
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findMin(nums) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def findMin(self, nums):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[3, 4, 5, 1, 2]], output: 1 },
            { input: [[4, 5, 6, 7, 0, 1, 2]], output: 0 },
            { input: [[11, 13, 15, 17]], output: 11 },
            { input: [[2, 1]], output: 1 },
            { input: [[1]], output: 1 }
        ],
        functionMetadata: {
            name: "findMin",
            parameters: [
                { name: "nums", type: "array" }
            ]
        }
    },
    {
        title: "Search in Rotated Sorted Array",
        description: `There is an integer array \`nums\` sorted in ascending order (with **distinct** values).

Prior to being passed to your function, \`nums\` is **possibly rotated** at an unknown pivot index \`k\` (\`1 <= k < nums.length\`) such that the resulting array is \`[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]\` (**0-indexed**). For example, \`[0,1,2,4,5,6,7]\` might be rotated at pivot index \`3\` and become \`[4,5,6,7,0,1,2]\`.

Given the array \`nums\` **after** the possible rotation and an integer \`target\`, return the index of \`target\` if it is in \`nums\`, or \`-1\` if it is not in \`nums\`.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
        difficulty: "Medium",
        category: "Binary Search",
        prerequisites: ["Binary Search", "Array", "Rotated Array"],
        starterCode: {
            Cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        // Your code here
        return -1;
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    search(nums, target) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def search(self, nums, target):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[4, 5, 6, 7, 0, 1, 2], 0], output: 4 },
            { input: [[4, 5, 6, 7, 0, 1, 2], 3], output: -1 },
            { input: [[1], 0], output: -1 },
            { input: [[1, 3], 3], output: 1 },
            { input: [[5, 1, 3], 3], output: 2 }
        ],
        functionMetadata: {
            name: "search",
            parameters: [
                { name: "nums", type: "array" },
                { name: "target", type: "number" }
            ]
        }
    },
    // ==================================================
    //                   HARD PROBLEM (1)
    // ==================================================
    {
        title: "Median of Two Sorted Arrays",
        description: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return **the median** of the two sorted arrays.

The overall run time complexity should be \`O(log (m+n))\`.`,
        difficulty: "Hard",
        category: "Binary Search",
        prerequisites: ["Binary Search", "Array", "Divide and Conquer", "Median"],
        starterCode: {
            Cpp: `class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        // Your code here
        return 0.0;
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number}
     */
    findMedianSortedArrays(nums1, nums2) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def findMedianSortedArrays(self, nums1, nums2):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[1, 3], [2]], output: 2.0 },
            { input: [[1, 2], [3, 4]], output: 2.5 },
            { input: [[0, 0], [0, 0]], output: 0.0 },
            { input: [[], [1]], output: 1.0 },
            { input: [[2], []], output: 2.0 }
        ],
        functionMetadata: {
            name: "findMedianSortedArrays",
            parameters: [
                { name: "nums1", type: "array" },
                { name: "nums2", type: "array" }
            ]
        }
    }
];

// --- Seeding Function ---
const seedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connection successful. 👍");

        // Clear existing binary search problems (optional - remove this if you want to keep existing data)
        console.log("Clearing existing Binary Search problems...");
        await Problem.deleteMany({ category: "Binary Search" });

        console.log("Seeding new Binary Search problems...");
        await Problem.insertMany(problems);
        console.log(`Successfully seeded ${problems.length} Binary Search problems! 🌱`);

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