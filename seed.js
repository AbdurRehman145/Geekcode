const mongoose = require('mongoose');
const Problem = require('./models/Problem');
const Submission = require('./models/Submission');

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/Geekcode');
        console.log('Connected to MongoDB');

        // Clear existing data
        await Problem.deleteMany({});
        await Submission.deleteMany({});
        console.log('Cleared existing data');

        // Sample problems data
        const problems = [
            {
                title: "Two Sum",
                description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
                difficulty: "Easy",
                category: "Array",
                prerequisites: ["Basic Programming", "Arrays"],
                starterCode: {
                    Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // Your code here\n    return {};\n}",
                    Javascript: "function twoSum(nums, target) {\n    // Your code here\n    return [];\n}",
                    Python: "def two_sum(nums, target):\n    # Your code here\n    return []"
                },
                testCases: [
                    { input: { nums: [2, 7, 11, 15], target: 9 }, output: [0, 1] },
                    { input: { nums: [3, 2, 4], target: 6 }, output: [1, 2] },
                    { input: { nums: [3, 3], target: 6 }, output: [0, 1] }
                ]
            },
            {
                title: "Reverse String",
                description: "Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.",
                difficulty: "Easy",
                category: "String",
                prerequisites: ["Basic Programming", "Strings"],
                starterCode: {
                    Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid reverseString(vector<char>& s) {\n    // Your code here\n}",
                    Javascript: "function reverseString(s) {\n    // Your code here\n}",
                    Python: "def reverse_string(s):\n    # Your code here\n    pass"
                },
                testCases: [
                    { input: ['h', 'e', 'l', 'l', 'o'], output: ['o', 'l', 'l', 'e', 'h'] },
                    { input: ['H', 'a', 'n', 'n', 'a', 'h'], output: ['h', 'a', 'n', 'n', 'a', 'H'] },
                    { input: ['A'], output: ['A'] }
                ]
            },
            {
                title: "Valid Parentheses",
                description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets and in the correct order.",
                difficulty: "Easy",
                category: "Stack",
                prerequisites: ["Basic Programming", "Stack Data Structure"],
                starterCode: {
                    Cpp: "#include <iostream>\n#include <string>\nusing namespace std;\n\nbool isValid(string s) {\n    // Your code here\n    return false;\n}",
                    Javascript: "function isValid(s) {\n    // Your code here\n    return false;\n}",
                    Python: "def is_valid(s):\n    # Your code here\n    return False"
                },
                testCases: [
                    { input: "()", output: true },
                    { input: "()[]{}", output: true },
                    { input: "(]", output: false },
                    { input: "([)]", output: false },
                    { input: "{[]}", output: true }
                ]
            },
            {
                title: "Longest Substring Without Repeating Characters",
                description: "Given a string s, find the length of the longest substring without repeating characters.",
                difficulty: "Medium",
                category: "String",
                prerequisites: ["Sliding Window", "Hash Map"],
                starterCode: {
                    Cpp: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint lengthOfLongestSubstring(string s) {\n    // Your code here\n    return 0;\n}",
                    Javascript: "function lengthOfLongestSubstring(s) {\n    // Your code here\n    return 0;\n}",
                    Python: "def length_of_longest_substring(s):\n    # Your code here\n    return 0"
                },
                testCases: [
                    { input: "abcabcbb", output: 3 },
                    { input: "bbbbb", output: 1 },
                    { input: "pwwkew", output: 3 },
                    { input: "", output: 0 }
                ]
            },
            {
                title: "Binary Tree Inorder Traversal",
                description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
                difficulty: "Medium",
                category: "Tree",
                prerequisites: ["Binary Trees", "Recursion"],
                starterCode: {
                    Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode() : val(0), left(nullptr), right(nullptr) {}\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nvector<int> inorderTraversal(TreeNode* root) {\n    // Your code here\n    return {};\n}",
                    Javascript: "function inorderTraversal(root) {\n    // Your code here\n    return [];\n}",
                    Python: "def inorder_traversal(root):\n    # Your code here\n    return []"
                },
                testCases: [
                    { input: [1, null, 2, 3], output: [1, 3, 2] },
                    { input: [], output: [] },
                    { input: [1], output: [1] }
                ]
            },
            {
                title: "Maximum Subarray",
                description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
                difficulty: "Hard",
                category: "Dynamic Programming",
                prerequisites: ["Dynamic Programming", "Arrays"],
                starterCode: {
                    Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint maxSubArray(vector<int>& nums) {\n    // Your code here\n    return 0;\n}",
                    Javascript: "function maxSubArray(nums) {\n    // Your code here\n    return 0;\n}",
                    Python: "def max_sub_array(nums):\n    # Your code here\n    return 0"
                },
                testCases: [
                    { input: [-2, 1, -3, 4, -1, 2, 1, -5, 4], output: 6 },
                    { input: [1], output: 1 },
                    { input: [5, 4, -1, 7, 8], output: 23 }
                ]
            }
        ];

        // Insert problems
        const insertedProblems = await Problem.insertMany(problems);
        console.log(`Inserted ${insertedProblems.length} problems`);

        // Sample submissions data
        const submissions = [
            {
                problemId: insertedProblems[0]._id, // Two Sum
                language: "Python",
                code: "def two_sum(nums, target):\n    for i in range(len(nums)):\n        for j in range(i + 1, len(nums)):\n            if nums[i] + nums[j] == target:\n                return [i, j]\n    return []",
                status: "Pending",
                output: []
            },
            {
                problemId: insertedProblems[0]._id, // Two Sum
                language: "Javascript",
                code: "function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n}",
                status: "Accepted",
                output: ["[0,1]", "[1,2]", "[0,1]"]
            },
            {
                problemId: insertedProblems[1]._id, // Reverse String
                language: "Python",
                code: "def reverse_string(s):\n    s.reverse()",
                status: "Accepted",
                output: ["['o','l','l','e','h']", "['h','a','n','n','a','H']", "['A']"]
            },
            {
                problemId: insertedProblems[2]._id, // Valid Parentheses
                language: "Javascript",
                code: "function isValid(s) {\n    const stack = [];\n    const mapping = { ')': '(', '}': '{', ']': '[' };\n    \n    for (let char of s) {\n        if (char in mapping) {\n            if (stack.pop() !== mapping[char]) {\n                return false;\n            }\n        } else {\n            stack.push(char);\n        }\n    }\n    \n    return stack.length === 0;\n}",
                status: "Wrong Answer",
                output: ["true", "true", "false"]
            },
            {
                problemId: insertedProblems[3]._id, // Longest Substring
                language: "Cpp",
                code: "#include <iostream>\n#include <string>\n#include <unordered_set>\nusing namespace std;\n\nint lengthOfLongestSubstring(string s) {\n    unordered_set<char> seen;\n    int left = 0, maxLen = 0;\n    \n    for (int right = 0; right < s.length(); right++) {\n        while (seen.count(s[right])) {\n            seen.erase(s[left]);\n            left++;\n        }\n        seen.insert(s[right]);\n        maxLen = max(maxLen, right - left + 1);\n    }\n    \n    return maxLen;\n}",
                status: "Time Limit Exceeded",
                output: []
            },
            {
                problemId: insertedProblems[4]._id, // Binary Tree Traversal
                language: "Python",
                code: "def inorder_traversal(root):\n    result = []\n    \n    def inorder(node):\n        if node:\n            inorder(node.left)\n            result.append(node.val)\n            inorder(node.right)\n    \n    inorder(root)\n    return result",
                status: "Processing",
                output: []
            }
        ];

        // Insert submissions
        const insertedSubmissions = await Submission.insertMany(submissions);
        console.log(`Inserted ${insertedSubmissions.length} submissions`);

        console.log('Database seeded successfully!');
        
        // Display summary
        console.log('\n--- SEEDING SUMMARY ---');
        console.log('Problems:');
        insertedProblems.forEach((problem, index) => {
            console.log(`  ${index + 1}. ${problem.title} (${problem.difficulty})`);
        });
        
        console.log('\nSubmissions:');
        insertedSubmissions.forEach((submission, index) => {
            const problem = insertedProblems.find(p => p._id.equals(submission.problemId));
            console.log(`  ${index + 1}. ${problem.title} - ${submission.language} (${submission.status})`);
        });

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
}

// Run the seeder
seedDatabase();