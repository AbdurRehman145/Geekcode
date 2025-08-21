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
    //                  EASY PROBLEMS (4)
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
    }
};`,
            Javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Your code here
};`,
            Python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Your code here`
        },
        testCases: [
            { input: { nums: [2, 7, 11, 15], target: 9 }, output: [0, 1] },
            { input: { nums: [3, 2, 4], target: 6 }, output: [1, 2] },
            { input: { nums: [3, 3], target: 6 }, output: [0, 1] }
        ]
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
    }
};`,
            Javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    // Your code here
};`,
            Python: `class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        # Your code here`
        },
        testCases: [
            { input: { nums: [1, 2, 3, 1] }, output: true },
            { input: { nums: [1, 2, 3, 4] }, output: false },
            { input: { nums: [1, 1, 1, 3, 3, 4, 3, 2, 4, 2] }, output: true }
        ]
    },
    {
        title: "Best Time to Buy and Sell Stock",
        description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i\`-th day. You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.`,
        difficulty: "Easy",
        category: "Array",
        prerequisites: ["Array Iteration", "Two Pointers"],
        starterCode: {
            Cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        // Your code here
    }
};`,
            Javascript: `/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    // Your code here
};`,
            Python: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        # Your code here`
        },
        testCases: [
            { input: { prices: [7, 1, 5, 3, 6, 4] }, output: 5 },
            { input: { prices: [7, 6, 4, 3, 1] }, output: 0 }
        ]
    },
    {
        title: "Remove Duplicates from Sorted Array",
        description: `Given an integer array \`nums\` sorted in **non-decreasing order**, remove the duplicates **in-place** such that each unique element appears only **once**. The relative order of the elements should be kept the **same**. Return \`k\`, the number of unique elements in \`nums\`.`,
        difficulty: "Easy",
        category: "Array",
        prerequisites: ["Array Manipulation", "Two Pointers"],
        starterCode: {
            Cpp: `class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        // Your code here
    }
};`,
            Javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    // Your code here
};`,
            Python: `class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        # Your code here`
        },
        testCases: [
            { input: { nums: [1, 1, 2] }, output: 2 },
            { input: { nums: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4] }, output: 5 }
        ]
    },
    // ==================================================
    //                  MEDIUM PROBLEMS (3)
    // ==================================================
    {
        title: "3Sum",
        description: `Given an integer array \`nums\`, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`. Notice that the solution set must not contain duplicate triplets.`,
        difficulty: "Medium",
        category: "Array",
        prerequisites: ["Array Sorting", "Two Pointers"],
        starterCode: {
            Cpp: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        // Your code here
    }
};`,
            Javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    // Your code here
};`,
            Python: `class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        # Your code here`
        },
        testCases: [
            { input: { nums: [-1, 0, 1, 2, -1, -4] }, output: [[-1, -1, 2], [-1, 0, 1]] },
            { input: { nums: [0, 1, 1] }, output: [] },
            { input: { nums: [0, 0, 0] }, output: [[0, 0, 0]] }
        ]
    },
    {
        title: "Product of Array Except Self",
        description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`. The product of any prefix or suffix of \`nums\` is **guaranteed** to fit in a **32-bit** integer. You must write an algorithm that runs in $O(n)$ time and without using the division operation.`,
        difficulty: "Medium",
        category: "Array",
        prerequisites: ["Array Iteration", "Prefix/Suffix Products"],
        starterCode: {
            Cpp: `class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        // Your code here
    }
};`,
            Javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    // Your code here
};`,
            Python: `class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        # Your code here`
        },
        testCases: [
            { input: { nums: [1, 2, 3, 4] }, output: [24, 12, 8, 6] },
            { input: { nums: [-1, 1, 0, -3, 3] }, output: [0, 0, 9, 0, 0] }
        ]
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
    }
};`,
            Javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    // Your code here
};`,
            Python: `class Solution:
    def maxArea(self, height: List[int]) -> int:
        # Your code here`
        },
        testCases: [
            { input: { height: [1, 8, 6, 2, 5, 4, 8, 3, 7] }, output: 49 },
            { input: { height: [1, 1] }, output: 1 }
        ]
    },
    // ==================================================
    //                   HARD PROBLEMS (3)
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
    }
};`,
            Javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    // Your code here
};`,
            Python: `class Solution:
    def trap(self, height: List[int]) -> int:
        # Your code here`
        },
        testCases: [
            { input: { height: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] }, output: 6 },
            { input: { height: [4, 2, 0, 3, 2, 5] }, output: 9 }
        ]
    },
    {
        title: "Median of Two Sorted Arrays",
        description: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return **the median** of the two sorted arrays. The overall run time complexity should be $O(\log(m+n))$.`,
        difficulty: "Hard",
        category: "Array",
        prerequisites: ["Binary Search", "Array Partitioning"],
        starterCode: {
            Cpp: `class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        // Your code here
    }
};`,
            Javascript: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    // Your code here
};`,
            Python: `class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        # Your code here`
        },
        testCases: [
            { input: { nums1: [1, 3], nums2: [2] }, output: 2.0 },
            { input: { nums1: [1, 2], nums2: [3, 4] }, output: 2.5 }
        ]
    },
    {
        title: "First Missing Positive",
        description: `Given an unsorted integer array \`nums\`, return the smallest missing positive integer. You must implement an algorithm that runs in $O(n)$ time and uses $O(1)$ auxiliary space.`,
        difficulty: "Hard",
        category: "Array",
        prerequisites: ["Array as Hash Map", "Cyclic Sort"],
        starterCode: {
            Cpp: `class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        // Your code here
    }
};`,
            Javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
    // Your code here
};`,
            Python: `class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        # Your code here`
        },
        testCases: [
            { input: { nums: [1, 2, 0] }, output: 3 },
            { input: { nums: [3, 4, -1, 1] }, output: 2 },
            { input: { nums: [7, 8, 9, 11, 12] }, output: 1 }
        ]
    }
];


// --- Seeding Function ---
const seedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connection successful. 👍");

        console.log("Seeding new problems...");
        await Problem.insertMany(problems);
        console.log(`Successfully seeded ${problems.length} problems! 🌱`);

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