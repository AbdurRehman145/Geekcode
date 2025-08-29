const mongoose = require('mongoose');
const Problem = require('../models/Problem');
const Submission = require('../models/Submission');

const treeSubmissions = [
    // ===== Maximum Depth of Binary Tree =====
    {
        "problemId": "68ae6156f4817d8e304d19d6", // Replace with actual MongoDB ObjectId
        "language": "Cpp",
        "code": "/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        // Base case: empty tree has depth 0\n        if (root == nullptr) {\n            return 0;\n        }\n        \n        // Recursively find depth of left and right subtrees\n        int leftDepth = maxDepth(root->left);\n        int rightDepth = maxDepth(root->right);\n        \n        // Return 1 (current node) + maximum depth of subtrees\n        return 1 + max(leftDepth, rightDepth);\n    }\n};",
        "status": "Pending"
    },

    // ===== Invert Binary Tree =====
    {
        "problemId": "68ae6156f4817d8e304d19dc", // Replace with actual MongoDB ObjectId
        "language": "Cpp",
        "code": "/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    TreeNode* invertTree(TreeNode* root) {\n        // Base case: if root is null, return null\n        if (root == nullptr) {\n            return nullptr;\n        }\n        \n        // Swap the left and right children\n        TreeNode* temp = root->left;\n        root->left = root->right;\n        root->right = temp;\n        \n        // Recursively invert the left and right subtrees\n        invertTree(root->left);\n        invertTree(root->right);\n        \n        return root;\n    }\n};",
        "status": "Pending"
    },

    // ===== Count Good Nodes in Binary Tree =====
    {
        "problemId": "68ae6156f4817d8e304d19e2", // Replace with actual MongoDB ObjectId
        "language": "Cpp",
        "code": "/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    int goodNodes(TreeNode* root) {\n        return dfs(root, root->val);\n    }\n    \nprivate:\n    int dfs(TreeNode* node, int maxSoFar) {\n        if (node == nullptr) {\n            return 0;\n        }\n        \n        int count = 0;\n        \n        // If current node value >= max value in path, it's a good node\n        if (node->val >= maxSoFar) {\n            count = 1;\n            maxSoFar = node->val;  // Update max for children\n        }\n        \n        // Recursively count good nodes in left and right subtrees\n        count += dfs(node->left, maxSoFar);\n        count += dfs(node->right, maxSoFar);\n        \n        return count;\n    }\n};",
        "status": "Pending"
    },

    // ===== Diameter of Binary Tree =====
    {
        "problemId": "68ae6156f4817d8e304d19e8", // Replace with actual MongoDB ObjectId
        "language": "Cpp",
        "code": "/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    int diameterOfBinaryTree(TreeNode* root) {\n        int diameter = 0;\n        calculateDepth(root, diameter);\n        return diameter;\n    }\n    \nprivate:\n    int calculateDepth(TreeNode* node, int& diameter) {\n        if (node == nullptr) {\n            return 0;\n        }\n        \n        // Get depths of left and right subtrees\n        int leftDepth = calculateDepth(node->left, diameter);\n        int rightDepth = calculateDepth(node->right, diameter);\n        \n        // Update diameter if path through current node is longer\n        // Path through current node = leftDepth + rightDepth\n        diameter = max(diameter, leftDepth + rightDepth);\n        \n        // Return depth of current node (1 + max depth of subtrees)\n        return 1 + max(leftDepth, rightDepth);\n    }\n};",
        "status": "Pending"
    },

    // ===== Binary Tree Level Order Traversal =====
    {
        "problemId": "68ae6156f4817d8e304d19ee", // Replace with actual MongoDB ObjectId
        "language": "Cpp",
        "code": "/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        vector<vector<int>> result;\n        \n        if (root == nullptr) {\n            return result;\n        }\n        \n        queue<TreeNode*> q;\n        q.push(root);\n        \n        while (!q.empty()) {\n            int levelSize = q.size();\n            vector<int> currentLevel;\n            \n            // Process all nodes at current level\n            for (int i = 0; i < levelSize; i++) {\n                TreeNode* node = q.front();\n                q.pop();\n                \n                currentLevel.push_back(node->val);\n                \n                // Add children to queue for next level\n                if (node->left != nullptr) {\n                    q.push(node->left);\n                }\n                if (node->right != nullptr) {\n                    q.push(node->right);\n                }\n            }\n            \n            result.push_back(currentLevel);\n        }\n        \n        return result;\n    }\n};",
        "status": "Pending"
    }
];

// Optional: Function to seed submissions to database
const seedSubmissions = async () => {
    try {
        const mongoose = require('mongoose');
        const Submission = require('../models/Submission'); // Adjust path as needed
        
        await mongoose.connect("mongodb://localhost:27017/Geekcode"); // Adjust connection string
        console.log("MongoDB connection successful for submissions. 👍");
        
        console.log("Seeding Tree problem submissions...");
        await Submission.insertMany(treeSubmissions);
        console.log(`Successfully seeded ${treeSubmissions.length} Tree problem submissions! 🌱`);
        
        console.log("\n📋 Submissions Added:");
        const problemNames = [
            "Maximum Depth of Binary Tree",
            "Invert Binary Tree", 
            "Count Good Nodes in Binary Tree",
            "Diameter of Binary Tree",
            "Binary Tree Level Order Traversal"
        ];
        
        problemNames.forEach((name, index) => {
            console.log(`${index + 1}. ${name} (C++)`);
        });
        
    } catch (error) {
        console.error("Error seeding submissions: ", error);
    } finally {
        await mongoose.connection.close();
        console.log("MongoDB connection closed. 👋");
    }
};

// Uncomment to run the seeding function
// seedSubmissions();

seedSubmissions();