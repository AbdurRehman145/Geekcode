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
    //                  EASY PROBLEMS (2)
    // ==================================================
    {
        title: "Valid Parentheses",
        description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid. An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
        difficulty: "Easy",
        category: "Stack",
        prerequisites: ["Stack Operations", "String Processing"],
        starterCode: {
            Cpp: `class Solution {
public:
    bool isValid(string s) {
        // Your code here
        return false;
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isValid(s) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def isValid(self, s):
        # Your code here
        pass`
        },
        testCases: [
            { input: ["()"], output: true },
            { input: ["()[]{}"], output: true },
            { input: ["(]"], output: false },
            { input: ["([)]"], output: false },
            { input: ["{[]}"], output: true }
        ],
        functionMetadata: {
            name: "isValid",
            parameters: [
                { name: "s", type: "string" }
            ]
        }
    },
    {
        title: "Min Stack",
        description: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the \`MinStack\` class:
- \`MinStack()\` initializes the stack object.
- \`void push(int val)\` pushes the element \`val\` onto the stack.
- \`void pop()\` removes the element on the top of the stack.
- \`int top()\` gets the top element of the stack.
- \`int getMin()\` retrieves the minimum element in the stack.

You must implement a solution with O(1) time complexity for each function.`,
        difficulty: "Easy",
        category: "Stack",
        prerequisites: ["Stack Data Structure", "Algorithm Design"],
        starterCode: {
            Cpp: `class MinStack {
public:
    MinStack() {
        // Your code here
    }
    
    void push(int val) {
        // Your code here
    }
    
    void pop() {
        // Your code here
    }
    
    int top() {
        // Your code here
        return 0;
    }
    
    int getMin() {
        // Your code here
        return 0;
    }
};`,
            Javascript: `class MinStack {
    constructor() {
        // Your code here
    }

    /**
     * @param {number} val
     * @return {void}
     */
    push(val) {
        // Your code here
    }

    /**
     * @return {void}
     */
    pop() {
        // Your code here
    }

    /**
     * @return {number}
     */
    top() {
        // Your code here
    }

    /**
     * @return {number}
     */
    getMin() {
        // Your code here
    }
}`,
            Python: `class MinStack:
    def __init__(self):
        # Your code here
        pass

    def push(self, val):
        # Your code here
        pass

    def pop(self):
        # Your code here
        pass

    def top(self):
        # Your code here
        pass

    def getMin(self):
        # Your code here
        pass`
        },
        testCases: [
            { 
                input: [["MinStack", "push", "push", "push", "getMin", "pop", "top", "getMin"], [[], [-2], [0], [-3], [], [], [], []]], 
                output: [null, null, null, null, -3, null, 0, -2] 
            }
        ],
        functionMetadata: {
            name: "MinStack",
            parameters: []
        }
    },
    // ==================================================
    //                  MEDIUM PROBLEMS (3)
    // ==================================================
    {
        title: "Evaluate Reverse Polish Notation",
        description: `Evaluate the value of an arithmetic expression in Reverse Polish Notation.

Valid operators are \`+\`, \`-\`, \`*\`, and \`/\`. Each operand may be an integer or another expression.

**Note** that division between two integers should truncate toward zero.

It is guaranteed that the given RPN expression is always valid. That means the expression would always evaluate to a result, and there will not be any division by zero operation.`,
        difficulty: "Medium",
        category: "Stack",
        prerequisites: ["Stack Operations", "Mathematical Operations", "String Processing"],
        starterCode: {
            Cpp: `class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        // Your code here
        return 0;
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {string[]} tokens
     * @return {number}
     */
    evalRPN(tokens) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def evalRPN(self, tokens):
        # Your code here
        pass`
        },
        testCases: [
            { input: [["2","1","+","3","*"]], output: 9 },
            { input: [["4","13","5","/","+"]], output: 6 },
            { input: [["10","6","9","3","+","-11","*","/","*","17","+","5","+"]], output: 22 }
        ],
        functionMetadata: {
            name: "evalRPN",
            parameters: [
                { name: "tokens", type: "array" }
            ]
        }
    },
    {
        title: "Daily Temperatures",
        description: `Given an array of integers \`temperatures\` represents the daily temperatures, return an array \`answer\` such that \`answer[i]\` is the number of days you have to wait after the \`i\`-th day to get a warmer temperature. If there is no future day for which this is possible, keep \`answer[i] == 0\` instead.`,
        difficulty: "Medium",
        category: "Stack",
        prerequisites: ["Monotonic Stack", "Array Processing"],
        starterCode: {
            Cpp: `class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        // Your code here
        return {};
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {number[]} temperatures
     * @return {number[]}
     */
    dailyTemperatures(temperatures) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def dailyTemperatures(self, temperatures):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[73,74,75,71,69,72,76,73]], output: [1,1,4,2,1,1,0,0] },
            { input: [[30,40,50,60]], output: [1,1,1,0] },
            { input: [[30,60,90]], output: [1,1,0] }
        ],
        functionMetadata: {
            name: "dailyTemperatures",
            parameters: [
                { name: "temperatures", type: "array" }
            ]
        }
    },
    {
        title: "Car Fleet",
        description: `There are \`n\` cars going to the same destination along a one-lane road. The destination is \`target\` miles away.

You are given two integer arrays \`position\` and \`speed\`, both of length \`n\`, where \`position[i]\` is the position of the \`i\`-th car and \`speed[i]\` is the speed of the \`i\`-th car (in miles per hour).

A car cannot pass another car ahead of it, but it can catch up to it and drive bumper to bumper at the same speed. The faster car will slow down to match the slower car's speed. The distance between these two cars is ignored (i.e., they are assumed to have the same position).

A **car fleet** is some non-empty set of cars driving at the same position and same speed. Note that a single car is also a car fleet.

If a car catches up to a car fleet right at the destination point, it will still be considered as one car fleet.

Return the **number of car fleets** that will arrive at the destination.`,
        difficulty: "Medium",
        category: "Stack",
        prerequisites: ["Sorting", "Stack Operations", "Mathematical Reasoning"],
        starterCode: {
            Cpp: `class Solution {
public:
    int carFleet(int target, vector<int>& position, vector<int>& speed) {
        // Your code here
        return 0;
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {number} target
     * @param {number[]} position
     * @param {number[]} speed
     * @return {number}
     */
    carFleet(target, position, speed) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def carFleet(self, target, position, speed):
        # Your code here
        pass`
        },
        testCases: [
            { input: [12, [10,8,0,5,3], [2,4,1,1,3]], output: 3 },
            { input: [10, [3], [3]], output: 1 },
            { input: [100, [0,2,4], [4,2,1]], output: 1 }
        ],
        functionMetadata: {
            name: "carFleet",
            parameters: [
                { name: "target", type: "number" },
                { name: "position", type: "array" },
                { name: "speed", type: "array" }
            ]
        }
    },
    // ==================================================
    //                   HARD PROBLEM (1)
    // ==================================================
    {
        title: "Largest Rectangle in Histogram",
        description: `Given an array of integers \`heights\` representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.`,
        difficulty: "Hard",
        category: "Stack",
        prerequisites: ["Monotonic Stack", "Array Processing", "Mathematical Reasoning"],
        starterCode: {
            Cpp: `class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        // Your code here
        return 0;
    }
};`,
            Javascript: `class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    largestRectangleArea(heights) {
        // Your code here
    }
}`,
            Python: `class Solution:
    def largestRectangleArea(self, heights):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[2,1,5,6,2,3]], output: 10 },
            { input: [[2,4]], output: 4 },
            { input: [[1,1]], output: 2 },
            { input: [[0]], output: 0 }
        ],
        functionMetadata: {
            name: "largestRectangleArea",
            parameters: [
                { name: "heights", type: "array" }
            ]
        }
    }
];

// --- Seeding Function ---
const seedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connection successful. 👍");

        console.log("Seeding new stack problems...");
        await Problem.insertMany(problems);
        console.log(`Successfully seeded ${problems.length} stack problems! 🌱`);

        // Display seeded problems summary
        console.log("\n📊 Seeded Problems Summary:");
        console.log("Easy: 2 problems");
        console.log("Medium: 3 problems");
        console.log("Hard: 1 problem");
        console.log("Total: 6 problems");

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