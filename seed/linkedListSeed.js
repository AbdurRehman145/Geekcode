const mongoose = require('mongoose');
// Make sure to import your Problem model correctly
// Assuming your model is in './models/Problem.js'
const Problem = require('../models/Problem');

// --- Configuration ---
// Replace with your MongoDB connection string
const MONGO_URI = "mongodb://localhost:27017/Geekcode";

// --- LinkedList Problems Data ---
const problems = [
    // ==================================================
    //                  EASY PROBLEMS (2)
    // ==================================================
    {
        title: "Reverse Linked List",
        description: `Given the \`head\` of a singly linked list, reverse the list, and return the reversed list.

**Example 1:**
\`\`\`
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
\`\`\`

**Example 2:**
\`\`\`
Input: head = [1,2]
Output: [2,1]
\`\`\`

**Example 3:**
\`\`\`
Input: head = []
Output: []
\`\`\``,
        difficulty: "Easy",
        category: "Linked List",
        prerequisites: ["Linked List", "Recursion", "Iterative Approach"],
        starterCode: {
            Cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        // Your code here
        return nullptr;
    }
};`,
            Javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
class Solution {
    reverseList(head) {
        // Your code here
    }
}`,
            Python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def reverseList(self, head):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[1, 2, 3, 4, 5]], output: [5, 4, 3, 2, 1] },
            { input: [[1, 2]], output: [2, 1] },
            { input: [[]], output: [] },
            { input: [[1]], output: [1] },
            { input: [[7, 9, 2]], output: [2, 9, 7] }
        ],
        functionMetadata: {
            name: "reverseList",
            parameters: [
                { name: "head", type: "linkedlist" }
            ],
            returnType: "linkedlist"
        }
    },
    {
        title: "Linked List Cycle Detection",
        description: `Given \`head\`, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the \`next\` pointer. Internally, \`pos\` is used to denote the index of the node that tail's \`next\` pointer is connected to. **Note that \`pos\` is not passed as a parameter**.

Return \`true\` if there is a cycle in the linked list. Otherwise, return \`false\`.

**Example 1:**
\`\`\`
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
\`\`\`

**Example 2:**
\`\`\`
Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.
\`\`\`

**Example 3:**
\`\`\`
Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.
\`\`\`

**Follow up:** Can you solve it using O(1) (i.e. constant) memory?`,
        difficulty: "Easy",
        category: "Linked List",
        prerequisites: ["Linked List", "Two Pointers", "Floyd's Tortoise and Hare", "Cycle Detection"],
        starterCode: {
            Cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    bool hasCycle(ListNode *head) {
        // Your code here
        return false;
    }
};`,
            Javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
class Solution {
    hasCycle(head) {
        // Your code here
        return false;
    }
}`,
            Python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def hasCycle(self, head):
        # Your code here
        return False`
        },
        testCases: [
            { input: [[3, 2, 0, -4], 1], output: true },
            { input: [[1, 2], 0], output: true },
            { input: [[1], -1], output: false },
            { input: [[], -1], output: false },
            { input: [[1, 2, 3, 4, 5], 2], output: true }
        ],
        functionMetadata: {
            name: "hasCycle",
            parameters: [
                { name: "head", type: "linkedlist" }
            ],
            returnType: "boolean"
        }
    },
    // ==================================================
    //                  MEDIUM PROBLEMS (2)
    // ==================================================
    {
        title: "Add Two Numbers",
        description: `You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

**Example 1:**
\`\`\`
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.
\`\`\`

**Example 2:**
\`\`\`
Input: l1 = [0], l2 = [0]
Output: [0]
\`\`\`

**Example 3:**
\`\`\`
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]
\`\`\``,
        difficulty: "Medium",
        category: "Linked List",
        prerequisites: ["Linked List", "Math", "Carry Handling", "Simulation"],
        starterCode: {
            Cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        // Your code here
        return nullptr;
    }
};`,
            Javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
class Solution {
    addTwoNumbers(l1, l2) {
        // Your code here
    }
}`,
            Python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def addTwoNumbers(self, l1, l2):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[2, 4, 3], [5, 6, 4]], output: [7, 0, 8] },
            { input: [[0], [0]], output: [0] },
            { input: [[9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9]], output: [8, 9, 9, 9, 0, 0, 0, 1] },
            { input: [[1, 8], [0]], output: [1, 8] },
            { input: [[5], [5]], output: [0, 1] }
        ],
        functionMetadata: {
            name: "addTwoNumbers",
            parameters: [
                { name: "l1", type: "linkedlist" },
                { name: "l2", type: "linkedlist" }
            ],
            returnType: "linkedlist"
        }
    },
    {
        title: "Find the Duplicate Number",
        description: `Given an array of integers \`nums\` containing \`n + 1\` integers where each integer is in the range \`[1, n]\` inclusive.

There is only **one repeated number** in \`nums\`, return this repeated number.

You must solve the problem **without** modifying the array \`nums\` and uses only constant extra space.

**Example 1:**
\`\`\`
Input: nums = [1,3,4,2,2]
Output: 2
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [3,1,3,4,2]
Output: 3
\`\`\`

**Example 3:**
\`\`\`
Input: nums = [3,3,3,3,3]
Output: 3
\`\`\`

**Constraints:**
- \`1 <= n <= 10^5\`
- \`nums.length == n + 1\`
- \`1 <= nums[i] <= n\`
- All the integers in \`nums\` appear only **once** except for **precisely one integer** which appears **two or more** times.

**Follow up:**
- How can we prove that at least one duplicate number must exist in \`nums\`?
- Can you solve the problem in linear runtime complexity?`,
        difficulty: "Medium",
        category: "Linked List",
        prerequisites: ["Array", "Two Pointers", "Floyd's Tortoise and Hare", "Cycle Detection"],
        starterCode: {
            Cpp: `class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        // Your code here
        return -1;
    }
};`,
            Javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
class Solution {
    findDuplicate(nums) {
        // Your code here
        return -1;
    }
}`,
            Python: `class Solution:
    def findDuplicate(self, nums):
        # Your code here
        return -1`
        },
        testCases: [
            { input: [[1, 3, 4, 2, 2]], output: 2 },
            { input: [[3, 1, 3, 4, 2]], output: 3 },
            { input: [[3, 3, 3, 3, 3]], output: 3 },
            { input: [[1, 1]], output: 1 },
            { input: [[2, 5, 9, 6, 9, 3, 8, 9, 7, 1]], output: 9 }
        ],
        functionMetadata: {
            name: "findDuplicate",
            parameters: [
                { name: "nums", type: "number[]" }
            ],
            returnType: "number"
        }
    }
];

// --- Seeding Function ---
const seedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connection successful. 👍");

        // Clear existing LinkedList problems (optional - remove this if you want to keep existing data)
        console.log("Clearing existing LinkedList problems...");
        await Problem.deleteMany({ category: "Linked List" });

        console.log("Seeding new LinkedList problems...");
        await Problem.insertMany(problems);
        console.log(`Successfully seeded ${problems.length} LinkedList problems! 🌱`);

        // Display seeded problems summary
        console.log("\n📊 Seeded Problems Summary:");
        console.log("Easy: 2 problems");
        console.log("Medium: 2 problems");
        console.log("Total: 4 problems");

        console.log("\n📋 Problems Added:");
        problems.forEach((problem, index) => {
            console.log(`${index + 1}. ${problem.title} (${problem.difficulty})`);
        });

        console.log("\n🔗 LinkedList-specific features:");
        console.log("- Problems include classic linked list operations and cycle detection");
        console.log("- Test cases use appropriate data structures for each problem type");
        console.log("- Function metadata includes proper parameter and return types");
        console.log("- Compatible with enhanced CodeExecutionWorker");

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