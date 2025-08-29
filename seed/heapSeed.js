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
        title: "Last Stone Weight",
        description: `You are given an array of integers \`stones\` where \`stones[i]\` is the weight of the \`ith\` stone.

We are playing a game with the stones. On each turn, we choose the **heaviest two stones** and smash them together. Suppose the heaviest two stones have weights \`x\` and \`y\` with \`x <= y\`. The result of this smash is:

- If \`x == y\`, both stones are destroyed, and
- If \`x != y\`, the stone of weight \`x\` is destroyed, and the stone of weight \`y\` has new weight \`y - x\`.

At the end of the game, there is **at most one stone left**.

Return *the weight of the last remaining stone*. If there are no stones left, return \`0\`.`,
        difficulty: "Easy",
        category: "Heap",
        prerequisites: ["Max Heap", "Priority Queue", "Simulation"],
        starterCode: {
            Cpp: `class Solution {
public:
    int lastStoneWeight(vector<int>& stones) {
        // Your code here
        return 0;
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {number[]} stones
     * @return {number}
     */
    lastStoneWeight(stones) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def lastStoneWeight(self, stones):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[2, 7, 4, 1, 8, 1]], output: 1 },
            { input: [[1]], output: 1 },
            { input: [[3, 7, 2]], output: 2 },
            { input: [[10, 4, 2, 10]], output: 2 },
            { input: [[1, 3]], output: 2 }
        ],
        functionMetadata: {
            name: "lastStoneWeight",
            parameters: [
                { name: "stones", type: "array" }
            ]
        }
    },
    // ==================================================
    //                  MEDIUM PROBLEMS (3)
    // ==================================================
    {
        title: "K Closest Points to Origin",
        description: `Given an array of \`points\` where \`points[i] = [xi, yi]\` represents a point on the X-Y plane and an integer \`k\`, return the \`k\` closest points to the origin \`(0, 0)\`.

The distance between two points on the X-Y plane is the Euclidean distance (i.e., \`√(x1 - x2)² + (y1 - y2)²\`).

You may return the answer in **any order**. The answer is **guaranteed** to be **unique** (except for the order that it is in).`,
        difficulty: "Medium",
        category: "Heap",
        prerequisites: ["Min Heap", "Max Heap", "Distance Calculation", "Quick Select"],
        starterCode: {
            Cpp: `class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        // Your code here
        return {};
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {number[][]} points
     * @param {number} k
     * @return {number[][]}
     */
    kClosest(points, k) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def kClosest(self, points, k):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[[1, 3], [-2, 2]], 1], output: [[-2, 2]] },
            { input: [[[3, 3], [5, -1], [-2, 4]], 2], output: [[3, 3], [-2, 4]] },
            { input: [[[0, 1], [1, 0]], 2], output: [[0, 1], [1, 0]] },
            { input: [[[1, 1], [1, 1], [1, 1]], 2], output: [[1, 1], [1, 1]] }
        ],
        functionMetadata: {
            name: "kClosest",
            parameters: [
                { name: "points", type: "array" },
                { name: "k", type: "number" }
            ]
        }
    },
    {
        title: "Kth Largest Element in an Array",
        description: `Given an integer array \`nums\` and an integer \`k\`, return *the* \`kth\` *largest element in the array*.

Note that it is the \`kth\` largest element in the sorted order, not the \`kth\` distinct element.

Can you solve it without sorting?`,
        difficulty: "Medium",
        category: "Heap",
        prerequisites: ["Min Heap", "Quick Select", "Partition", "Priority Queue"],
        starterCode: {
            Cpp: `class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        // Your code here
        return 0;
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    findKthLargest(nums, k) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def findKthLargest(self, nums, k):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[3, 2, 1, 5, 6, 4], 2], output: 5 },
            { input: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], output: 4 },
            { input: [[1], 1], output: 1 },
            { input: [[7, 10, 4, 3, 20, 15], 3], output: 10 },
            { input: [[2, 1], 1], output: 2 }
        ],
        functionMetadata: {
            name: "findKthLargest",
            parameters: [
                { name: "nums", type: "array" },
                { name: "k", type: "number" }
            ]
        }
    },
    {
        title: "Task Scheduler",
        description: `Given a characters array \`tasks\`, representing the tasks a CPU needs to do, where each letter represents a different kind of task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.

However, there is a non-negative integer \`n\` that represents the cooldown period between two **same tasks** (the same letter in the array), that is that there must be at least \`n\` units of time between any two same tasks.

Return *the least number of units of time that the CPU will take to finish all the given tasks*.`,
        difficulty: "Medium",
        category: "Heap",
        prerequisites: ["Max Heap", "Greedy Algorithm", "Frequency Counting", "Queue"],
        starterCode: {
            Cpp: `class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        // Your code here
        return 0;
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {character[]} tasks
     * @param {number} n
     * @return {number}
     */
    leastInterval(tasks, n) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def leastInterval(self, tasks, n):
        # Your code here
        pass`
        },
        testCases: [
            { input: [["A", "A", "A", "B", "B", "B"], 2], output: 8 },
            { input: [["A", "A", "A", "B", "B", "B"], 0], output: 6 },
            { input: [["A", "A", "A", "A", "A", "A", "B", "C", "D", "E", "F", "G"], 2], output: 16 },
            { input: [["A", "B", "C", "D", "E", "A", "B", "C", "D", "E"], 4], output: 10 },
            { input: [["A", "A", "A", "B", "B", "B", "C", "C", "C", "D", "D", "E"], 2], output: 12 }
        ],
        functionMetadata: {
            name: "leastInterval",
            parameters: [
                { name: "tasks", type: "array" },
                { name: "n", type: "number" }
            ]
        }
    }
];

// --- Seeding Function ---
const seedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connection successful. 👍");

        // Clear existing heap problems (optional - remove this if you want to keep existing data)
        console.log("Clearing existing Heap problems...");
        await Problem.deleteMany({ category: "Heap" });

        console.log("Seeding new Heap problems...");
        await Problem.insertMany(problems);
        console.log(`Successfully seeded ${problems.length} Heap problems! 🌱`);

        // Display seeded problems summary
        console.log("\n📊 Seeded Problems Summary:");
        console.log("Easy: 1 problem");
        console.log("Medium: 3 problems");
        console.log("Hard: 0 problems");
        console.log("Total: 4 problems");

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