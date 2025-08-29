const mongoose = require('mongoose');
// Make sure to import your Problem model correctly
// Assuming your model is in './models/Problem.js'
const Problem = require('../models/Problem');

// --- Configuration ---
// Replace with your MongoDB connection string
const MONGO_URI = "mongodb://localhost:27017/Geekcode";

// --- Tree Problems Data ---
const problems = [
    // ==================================================
    //                  EASY PROBLEMS (3)
    // ==================================================
    {
        title: "Maximum Depth of Binary Tree",
        description: `Given the \`root\` of a binary tree, return its maximum depth.

A binary tree's **maximum depth** is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
        difficulty: "Easy",
        category: "Tree",
        prerequisites: ["Binary Tree", "Recursion", "DFS", "Tree Traversal"],
        starterCode: {
            Cpp: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int maxDepth(TreeNode* root) {
        // Your code here
        return 0;
    }
};`,
            Javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
class Solution {
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    maxDepth(root) {
        // Your code here
    }
}`,
            Python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def maxDepth(self, root):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[3, 9, 20, null, null, 15, 7]], output: 3 },
            { input: [[1, null, 2]], output: 2 },
            { input: [[]], output: 0 },
            { input: [[1]], output: 1 },
            { input: [[1, 2, 3, 4, 5]], output: 3 }
        ],
        functionMetadata: {
            name: "maxDepth",
            parameters: [
                { name: "root", type: "tree" }
            ],
            returnType: "number"
        }
    },
    {
        title: "Invert Binary Tree",
        description: `Given the \`root\` of a binary tree, invert the tree, and return its root.`,
        difficulty: "Easy",
        category: "Tree",
        prerequisites: ["Binary Tree", "Recursion", "DFS", "Tree Manipulation"],
        starterCode: {
            Cpp: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        // Your code here
        return nullptr;
    }
};`,
            Javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
class Solution {
    /**
     * @param {TreeNode} root
     * @return {TreeNode}
     */
    invertTree(root) {
        // Your code here
    }
}`,
            Python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def invertTree(self, root):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[4, 2, 7, 1, 3, 6, 9]], output: [4, 7, 2, 9, 6, 3, 1] },
            { input: [[2, 1, 3]], output: [2, 3, 1] },
            { input: [[]], output: [] },
            { input: [[1]], output: [1] },
        ],
        functionMetadata: {
            name: "invertTree",
            parameters: [
                { name: "root", type: "tree" }
            ],
            returnType: "tree"
        }
    },
    {
        title: "Count Good Nodes in Binary Tree",
        description: `Given a binary tree \`root\`, a node X in the tree is named **good** if in the path from root to X there are no nodes with a value *greater than* X.

Return the number of **good** nodes in the binary tree.`,
        difficulty: "Easy",
        category: "Tree",
        prerequisites: ["Binary Tree", "DFS", "Tree Traversal", "Path Tracking"],
        starterCode: {
            Cpp: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int goodNodes(TreeNode* root) {
        // Your code here
        return 0;
    }
};`,
            Javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
class Solution {
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    goodNodes(root) {
        // Your code here
    }
}`,
            Python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def goodNodes(self, root):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[3, 1, 4, 3, null, 1, 5]], output: 4 },
            { input: [[3, 3, null, 4, 2]], output: 3 },
            { input: [[1]], output: 1 },
            { input: [[9, null, 3, 6]], output: 1 },
            { input: [[2, null, 4, 10, 8, null, null, 4]], output: 4 }
        ],
        functionMetadata: {
            name: "goodNodes",
            parameters: [
                { name: "root", type: "tree" }
            ],
            returnType: "number"
        }
    },
    // ==================================================
    //                  MEDIUM PROBLEMS (2)
    // ==================================================
    {
        title: "Diameter of Binary Tree",
        description: `Given the \`root\` of a binary tree, return the length of the **diameter** of the tree.

The **diameter** of a binary tree is the **length** of the longest path between any two nodes in a tree. This path may or may not pass through the \`root\`.

The **length** of a path between two nodes is represented by the number of edges between them.`,
        difficulty: "Medium",
        category: "Tree",
        prerequisites: ["Binary Tree", "DFS", "Tree Traversal", "Path Length Calculation"],
        starterCode: {
            Cpp: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int diameterOfBinaryTree(TreeNode* root) {
        // Your code here
        return 0;
    }
};`,
            Javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
class Solution {
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    diameterOfBinaryTree(root) {
        // Your code here
    }
}`,
            Python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def diameterOfBinaryTree(self, root):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[1, 2, 3, 4, 5]], output: 3 },
            { input: [[1, 2]], output: 1 },
            { input: [[1]], output: 0 },
            { input: [[1, 2, 3, 4, 5, null, null, 6]], output: 4 },
            { input: [[4, -7, -3, null, null, -9, -3, 9, -7, -4, null, 6, null, -6, -6, null, null, 0, 6, 5, null, 9, null, null, -1, -4, null, null, null, -2]], output: 8 }
        ],
        functionMetadata: {
            name: "diameterOfBinaryTree",
            parameters: [
                { name: "root", type: "tree" }
            ],
            returnType: "number"
        }
    },
    {
        title: "Binary Tree Level Order Traversal",
        description: `Given the \`root\` of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).`,
        difficulty: "Medium",
        category: "Tree",
        prerequisites: ["Binary Tree", "BFS", "Queue", "Tree Traversal", "Level Order"],
        starterCode: {
            Cpp: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        // Your code here
        return {};
    }
};`,
            Javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
class Solution {
    /**
     * @param {TreeNode} root
     * @return {number[][]}
     */
    levelOrder(root) {
        // Your code here
    }
}`,
            Python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def levelOrder(self, root):
        # Your code here
        pass`
        },
        testCases: [
            { input: [[3, 9, 20, null, null, 15, 7]], output: [[3], [9, 20], [15, 7]] },
            { input: [[1]], output: [[1]] },
            { input: [[]], output: [] },
            { input: [[1, 2, 3, 4, 5, 6, 7]], output: [[1], [2, 3], [4, 5, 6, 7]] },
            { input: [[1, 2, null, 3, null, 4, null, 5]], output: [[1], [2], [3], [4], [5]] }
        ],
        functionMetadata: {
            name: "levelOrder",
            parameters: [
                { name: "root", type: "tree" }
            ],
            returnType: "array2d"
        }
    }
];

// --- Seeding Function ---
const seedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connection successful. 👍");

        // Clear existing tree problems (optional - remove this if you want to keep existing data)
        console.log("Clearing existing Tree problems...");
        await Problem.deleteMany({ category: "Tree" });

        console.log("Seeding new Tree problems...");
        await Problem.insertMany(problems);
        console.log(`Successfully seeded ${problems.length} Tree problems! 🌱`);

        // Display seeded problems summary
        console.log("\n📊 Seeded Problems Summary:");
        console.log("Easy: 3 problems");
        console.log("Medium: 2 problems");
        console.log("Hard: 0 problems");
        console.log("Total: 5 problems");

        console.log("\n📋 Problems Added:");
        problems.forEach((problem, index) => {
            console.log(`${index + 1}. ${problem.title} (${problem.difficulty})`);
        });

        console.log("\n🎯 Tree Problem Categories:");
        console.log("• Tree Traversal (DFS/BFS)");
        console.log("• Tree Manipulation");
        console.log("• Tree Properties");
        console.log("• Level Order Processing");

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