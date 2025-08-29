const redis = require('redis');
const mongoose = require('mongoose');
const {exec} = require('child_process');
const fs = require('fs');
const path = require('path');

const Problem = require('../models/Problem');
const Submission = require('../models/Submission');

class CodeExecutionWorker {
    constructor(){
        this.redisClient = redis.createClient();

        this.redisClient.on('error', (err) => {
            console.log(`Redis client error: ${err}`);
        });

        this.redisClient.on('connect', () => {
            console.log('Worker connected to Redis');
        });

        this.redisClient.connect();

        mongoose.connect('mongodb://localhost:27017/Geekcode');

        this.tempDir = path.join(__dirname, 'temp');
        if(!fs.existsSync(this.tempDir)){
            fs.mkdirSync(this.tempDir);
        }
    }

    async start(){
        if (!this.redisClient.isOpen) {
            await this.redisClient.connect();
            console.log("Worker connected to Redis");
        }
        console.log("Worker started and waiting for jobs");

        while(true){
            try{
                const submissionId = await this.redisClient.blPop('jobQueue', 0);
                if(submissionId && submissionId.element){
                    console.log(`Received job: ${submissionId.element}`);
                    await this.processSubmission(submissionId.element);
                }
            } catch(err) {
                console.log(`Error in worker loop: ${err.message}`)
                await this.sleep(5000);
            }
        }
    }

    async processSubmission(submissionId){
        try{
            await Submission.findByIdAndUpdate(submissionId, {
                status: 'Processing'
            });

            const submission = await Submission.findById(submissionId);
            if(!submission){
                throw new Error("Submission not found");
            }

            const problem = await Problem.findById(submission.problemId);
            if(!problem){ 
                throw new Error("Problem not found");
            }

            const result = await this.executeCode(submission, problem);

            await Submission.findByIdAndUpdate(submissionId, {
                status: result.status,
                output: result.output
            });

        }catch(err) {
            console.log(`Error processing submission: ${err.message}`);

            await Submission.findByIdAndUpdate(submissionId, {
                status: 'Error',
                output: [err.message]
            })
        }
    }

    async executeCode(submission, problem){
        const {language, code} = submission;
        const {testCases} = problem;

        try {
            let allPassed = true;
            let outputs = [];

            for(let i = 0; i < testCases.length; i++){
                const testCase = testCases[i];

                console.log(`Running test case ${i+1}/${testCases.length}`);
                console.log(`Test case input:`, testCase.input);
                console.log(`Expected output:`, testCase.output);

                const result = await this.runSingleTest(code, language, testCase, problem);
                
                console.log(`Test result:`, result);
                
                // Parse the output into array format if it's a comma-separated string
                let parsedOutput;
                if (result.status === 'passed' && typeof result.output === 'string' && result.output.includes(',')) {
                    // Only parse successful outputs
                    parsedOutput = result.output.split(',').map(item => {
                        const trimmed = item.trim();
                        const num = parseInt(trimmed);
                        return isNaN(num) ? trimmed : num;
                    });
                } else if (result.status === 'passed' && typeof result.output === 'string' && !isNaN(result.output)) {
                    // Single number for successful tests
                    parsedOutput = [parseInt(result.output)];
                } else {
                    // Keep failed tests, errors, and timeouts as strings
                    parsedOutput = result.output;
                }
                
                outputs.push(parsedOutput);

                if(result.status !== 'passed'){
                    allPassed = false;
                    
                    if(result.status === 'timeout'){
                        return {
                            status: "Time Limit Exceeded",
                            output: outputs
                        };
                    } else {
                        return {
                            status: "Wrong Answer",
                            output: outputs
                        }
                    }
                }
            }

            return {
                status: 'Accepted',
                output: outputs
            }
        } catch(err) {
            console.log(`Execute code error: ${err.message}`);
            return {
                status: 'Error',
                output: [err.message]
            }
        }
    }

    async runSingleTest(code, language, testCase, problem) {
        const dockerImage = this.getDockerImage(language);
        const filename = this.getFileName(language);
        const filePath = path.join(this.tempDir, filename);

        try {
            // Prepare code with test case input
            let modifiedCode = this.prepareCodeForExecution(code, language, testCase.input, problem.functionMetadata);
            console.log(`Writing code to: ${filePath}`);
            fs.writeFileSync(filePath, modifiedCode);
            
            const dockerCmd = this.buildDockerCommand(dockerImage, language, filename);
            console.log('Running Docker command:', dockerCmd);

            const result = await this.executeWithTimeout(dockerCmd, 50000); // Reduced timeout
            const actualOutput = result.stdout.trim();
            const expectedOutput = testCase.output.toString().trim();

            console.log(`Actual output: "${actualOutput}"`);
            console.log(`Expected output: "${expectedOutput}"`);

            if(actualOutput === expectedOutput) {
                return {
                    status: 'passed',
                    output: actualOutput
                };
            } else {
                return {
                    status: 'failed',
                    output: `Expected: ${expectedOutput}, Got: ${actualOutput}`
                };
            }
        } catch(err) {
            console.log(`Test execution error: ${err.message}`);
            
            if(err.message.includes('timeout')) {
                return {
                    status: 'timeout',
                    output: 'Time Limit Exceeded'
                };
            }
            return {
                status: 'error',
                output: `Execution Error: ${err.message}`
            };
        } finally {
            this.cleanupFiles([filePath]);
        }
    }

    prepareCodeForExecution(code, language, input, functionMetadata) {
        switch(language) {
            case 'Python':
                return this.preparePythonCode(code, input, functionMetadata);
            case 'Javascript':
                return this.prepareJavascriptCode(code, input, functionMetadata);
            case 'Cpp':
                return this.prepareCppCode(code, input, functionMetadata);
            default:
                throw new Error(`Unsupported language: ${language}`);
        }
    }

   preparePythonCode(code, input, metadata) {
    // Helper function to convert array to linked list and binary tree
    const treeAndLinkedListHelper = `
# ListNode definition for linked list problems
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
    
    def __repr__(self):
        return f"ListNode({self.val})"

# TreeNode definition for binary tree problems
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
    
    def __repr__(self):
        return f"TreeNode({self.val})"

# Helper function to convert array to linked list
def array_to_linked_list(arr):
    if not arr:
        return None
    
    head = ListNode(arr[0])
    current = head
    
    for i in range(1, len(arr)):
        current.next = ListNode(arr[i])
        current = current.next
    
    return head

# Helper function to convert linked list to array
def linked_list_to_array(head):
    result = []
    current = head
    visited = set()  # To handle potential cycles
    
    while current and current not in visited:
        visited.add(current)
        result.append(current.val)
        current = current.next
        
        # Safety check to prevent infinite loops
        if len(result) > 10000:
            break
    
    return result

# Helper function to convert array to binary tree (level order)
def array_to_binary_tree(arr):
    if not arr or arr[0] is None:
        return None
    
    root = TreeNode(arr[0])
    queue = [root]
    i = 1
    
    while queue and i < len(arr):
        node = queue.pop(0)
        
        # Left child
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i])
            queue.append(node.left)
        i += 1
        
        # Right child
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i])
            queue.append(node.right)
        i += 1
    
    return root

# Helper function to convert binary tree to array (level order with nulls)
def binary_tree_to_array(root):
    if not root:
        return []
    
    result = []
    queue = [root]
    
    while queue:
        node = queue.pop(0)
        
        if node:
            result.append(node.val)
            queue.append(node.left)
            queue.append(node.right)
        else:
            result.append(None)
    
    # Remove trailing None values
    while result and result[-1] is None:
        result.pop()
    
    return result
`;

    // Helper function to convert JavaScript values to Python format
    const toPythonValue = (value) => {
        if (value === null) return 'None';
        if (Array.isArray(value)) {
            return '[' + value.map(toPythonValue).join(', ') + ']';
        }
        if (typeof value === 'string') {
            return `"${value}"`;
        }
        return String(value);
    };

    // Generate input assignments with LinkedList and BinaryTree support
    const inputAssignments = metadata.parameters
        .map((param, index) => {
            const inputValue = input[index];
            
            if (param.type === 'linkedlist') {
                return `        ${param.name} = array_to_linked_list(${toPythonValue(inputValue)})`;
            } else if (param.type === 'binarytree' || param.type === 'tree') {
                return `        ${param.name} = array_to_binary_tree(${toPythonValue(inputValue)})`;
            } else {
                return `        ${param.name} = ${toPythonValue(inputValue)}`;
            }
        })
        .join('\n');

    const functionCall = `solution.${metadata.name}(${metadata.parameters.map(p => p.name).join(', ')})`;

    // Determine if result needs conversion
    const hasLinkedListReturn = metadata.returnType === 'linkedlist';
    const hasBinaryTreeReturn = metadata.returnType === 'binarytree' || metadata.returnType === 'tree';

    const wrapper = `
import sys
import json

${treeAndLinkedListHelper}

# User's solution code
${code}

# Test execution
def main():
    try:
        solution = Solution()
        
        # Input variables are prepared dynamically
${inputAssignments}
        
        # Function call is prepared dynamically
        result = ${functionCall}
        
        # Format output for consistency and handle type conversion
        ${hasLinkedListReturn ? `
        if isinstance(result, ListNode):
            # Convert LinkedList result to array format
            result = linked_list_to_array(result)` : ''}
        
        # Handle BinaryTree return type - check for TreeNode structure
        if hasattr(result, 'val') and hasattr(result, 'left') and hasattr(result, 'right'):
            # Convert BinaryTree result to array format
            result = binary_tree_to_array(result)
        
        if isinstance(result, list):
            # Handle 2D lists by flattening them
            if result and isinstance(result[0], list):
                # Flatten 2D list to comma-separated string
                flattened = []
                for sublist in result:
                    flattened.extend(sublist)
                print(','.join(map(str, flattened)))
            else:
                # For 1D lists, print as comma-separated string
                print(','.join(map(str, result)))
        elif isinstance(result, bool):
            # Convert Python boolean to lowercase string
            print(str(result).lower())
        elif isinstance(result, float):
            # Check if float is actually an integer value
            if result.is_integer():
                print(int(result))
            else:
                print(result)
        else:
            print(result)
            
    except Exception as e:
        print(f"Runtime Error: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
`;
    return wrapper;
}



prepareJavascriptCode(code, input, metadata) {
    const treeAndLinkedListHelper = `
// ListNode definition for linked list problems
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// TreeNode definition for binary tree problems
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Helper function to convert array to linked list
function arrayToLinkedList(arr) {
    if (!arr || arr.length === 0) {
        return null;
    }
    
    const head = new ListNode(arr[0]);
    let current = head;
    
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    
    return head;
}

// Helper function to convert linked list to array
function linkedListToArray(head) {
    const result = [];
    let current = head;
    const visited = new Set();
    
    while (current && !visited.has(current)) {
        visited.add(current);
        result.push(current.val);
        current = current.next;
        
        // Safety check to prevent infinite loops
        if (result.length > 10000) {
            break;
        }
    }
    
    return result;
}

// Helper function to convert array to binary tree (level order)
function arrayToBinaryTree(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) {
        return null;
    }
    
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    
    while (queue.length > 0 && i < arr.length) {
        const node = queue.shift();
        
        // Left child
        if (i < arr.length && arr[i] !== null) {
            node.left = new TreeNode(arr[i]);
            queue.push(node.left);
        }
        i++;
        
        // Right child
        if (i < arr.length && arr[i] !== null) {
            node.right = new TreeNode(arr[i]);
            queue.push(node.right);
        }
        i++;
    }
    
    return root;
}

// Helper function to convert binary tree to array (level order with nulls)
function binaryTreeToArray(root) {
    if (!root) {
        return [];
    }
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const node = queue.shift();
        
        if (node) {
            result.push(node.val);
            queue.push(node.left);
            queue.push(node.right);
        } else {
            result.push(null);
        }
    }
    
    // Remove trailing null values
    while (result.length > 0 && result[result.length - 1] === null) {
        result.pop();
    }
    
    return result;
}
`;

    const inputAssignments = metadata.parameters
        .map((param, index) => {
            const inputValue = input[index];
            
            if (param.type === 'linkedlist') {
                return `        const ${param.name} = arrayToLinkedList(${JSON.stringify(inputValue)});`;
            } else if (param.type === 'binarytree' || param.type === 'tree') {
                return `        const ${param.name} = arrayToBinaryTree(${JSON.stringify(inputValue)});`;
            } else {
                return `        const ${param.name} = ${JSON.stringify(inputValue)};`;
            }
        })
        .join('\n');
    
    const functionCall = `solution.${metadata.name}(${metadata.parameters.map(p => p.name).join(', ')})`;
    const hasLinkedListReturn = metadata.returnType === 'linkedlist';
    const hasBinaryTreeReturn = metadata.returnType === 'binarytree' || metadata.returnType === 'tree';

    const wrapper = `
${treeAndLinkedListHelper}

// User's solution code
${code}

// Test execution
function main() {
    try {
        const solution = new Solution();
        
        // Input variables
${inputAssignments}
        
        // Dynamic function call
        let result = ${functionCall};
        
        // Handle LinkedList return type
        ${hasLinkedListReturn ? `
        if (result && typeof result === 'object' && 'val' in result && 'next' in result) {
            // Convert LinkedList result to array format
            result = linkedListToArray(result);
        }` : ''}
        
        // Handle BinaryTree return type - check for TreeNode structure
        if (result && typeof result === 'object' && 'val' in result && 'left' in result && 'right' in result) {
            // Convert BinaryTree result to array format
            result = binaryTreeToArray(result);
        }
        
        // Format output
        if (Array.isArray(result)) {
            // Handle 2D arrays by flattening them
            if (result.length > 0 && Array.isArray(result[0])) {
                // Flatten 2D array to comma-separated string
                const flattened = result.flat();
                console.log(flattened.join(','));
            } else {
                // For 1D arrays, print as comma-separated string
                console.log(result.join(','));
            }
        } else {
            console.log(result);
        }
        
    } catch (error) {
        console.error(\`Runtime Error: \${error.message}\`);
        process.exit(1);
    }
}

main();
`;
    return wrapper;
}


// Enhanced prepareCppCode function with fixes for heap problems
prepareCppCode(code, input, metadata) {
    const treeAndLinkedListHelper = `
// ListNode definition for linked list problems
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

// TreeNode definition for binary tree problems
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

// Helper function to convert vector to linked list
ListNode* arrayToLinkedList(const vector<int>& arr) {
    if (arr.empty()) {
        return nullptr;
    }
    
    ListNode* head = new ListNode(arr[0]);
    ListNode* current = head;
    
    for (size_t i = 1; i < arr.size(); i++) {
        current->next = new ListNode(arr[i]);
        current = current->next;
    }
    
    return head;
}

// Helper function to convert linked list to vector
vector<int> linkedListToArray(ListNode* head) {
    vector<int> result;
    ListNode* current = head;
    unordered_set<ListNode*> visited;
    
    while (current && visited.find(current) == visited.end()) {
        visited.insert(current);
        result.push_back(current->val);
        current = current->next;
        
        // Safety check to prevent infinite loops
        if (result.size() > 10000) {
            break;
        }
    }
    
    return result;
}

// Helper function to convert vector to binary tree (level order, using INT_MIN for null)
TreeNode* arrayToBinaryTree(const vector<int>& arr) {
    if (arr.empty() || arr[0] == INT_MIN) {
        return nullptr;
    }
    
    TreeNode* root = new TreeNode(arr[0]);
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    
    while (!q.empty() && i < arr.size()) {
        TreeNode* node = q.front();
        q.pop();
        
        // Left child
        if (i < arr.size() && arr[i] != INT_MIN) {
            node->left = new TreeNode(arr[i]);
            q.push(node->left);
        }
        i++;
        
        // Right child
        if (i < arr.size() && arr[i] != INT_MIN) {
            node->right = new TreeNode(arr[i]);
            q.push(node->right);
        }
        i++;
    }
    
    return root;
}

// Helper function to convert binary tree to vector (level order with INT_MIN for null)
vector<int> binaryTreeToArray(TreeNode* root) {
    if (!root) {
        return {};
    }
    
    vector<int> result;
    queue<TreeNode*> q;
    q.push(root);
    
    while (!q.empty()) {
        TreeNode* node = q.front();
        q.pop();
        
        if (node) {
            result.push_back(node->val);
            q.push(node->left);
            q.push(node->right);
        } else {
            result.push_back(INT_MIN);
        }
    }
    
    // Remove trailing INT_MIN values
    while (!result.empty() && result.back() == INT_MIN) {
        result.pop_back();
    }
    
    return result;
}

// Helper function to delete linked list (memory cleanup)
void deleteLinkedList(ListNode* head) {
    unordered_set<ListNode*> visited;
    while (head && visited.find(head) == visited.end()) {
        visited.insert(head);
        ListNode* next = head->next;
        delete head;
        head = next;
    }
}

// Helper function to delete binary tree (memory cleanup)
void deleteBinaryTree(TreeNode* root) {
    if (!root) return;
    deleteBinaryTree(root->left);
    deleteBinaryTree(root->right);
    delete root;
}

// Helper function to convert string array to char vector
vector<char> stringArrayToCharVector(const vector<string>& strArr) {
    vector<char> result;
    for (const string& str : strArr) {
        if (!str.empty()) {
            result.push_back(str[0]); // Take first character of each string
        }
    }
    return result;
}

// Helper function to convert 1D array to 2D array for points representation
vector<vector<int>> arrayTo2D(const vector<int>& arr, int cols = 2) {
    vector<vector<int>> result;
    for (size_t i = 0; i < arr.size(); i += cols) {
        vector<int> row;
        for (int j = 0; j < cols && i + j < arr.size(); j++) {
            row.push_back(arr[i + j]);
        }
        if (!row.empty()) {
            result.push_back(row);
        }
    }
    return result;
}
`;

    // Enhanced type mapping for C++
    const typeMap = {
        'number': 'int',
        'string': 'string',
        'array': 'vector<int>',
        'stringArray': 'vector<string>',
        'charArray': 'vector<char>',
        '2dArray': 'vector<vector<int>>',
        'points': 'vector<vector<int>>',
        'linkedlist': 'ListNode*',
        'binarytree': 'TreeNode*',
        'tree': 'TreeNode*'
    };

    // Helper function to check if this should be treated as a character array
    const shouldUseCharArray = (param, inputValue, metadata) => {
        // Explicit charArray type
        if (param.type === 'charArray') return true;
        
        // Check for specific function patterns that use character arrays
        const charArrayFunctions = [
            'taskscheduler', 'task', 'schedulertask',
            'frequencysort', 'sortcharacters', 'sortbyfrequency'
        ];
        
        const functionNameLower = metadata.name.toLowerCase();
        const paramNameLower = param.name.toLowerCase();
        
        // Check if function or parameter name suggests character array usage
        if (charArrayFunctions.some(pattern => 
            functionNameLower.includes(pattern) || paramNameLower.includes('char') || paramNameLower.includes('task')
        )) {
            return Array.isArray(inputValue) && 
                   inputValue.every(item => typeof item === 'string' && item.length === 1);
        }
        
        return false;
    };

    const inputDeclarations = metadata.parameters.map((param, index) => {
        const inputValue = input[index];
        
        if (param.type === 'linkedlist') {
            return `ListNode* ${param.name} = arrayToLinkedList({${inputValue.join(', ')}});`;
        } else if (param.type === 'binarytree' || param.type === 'tree') {
            // Replace null with INT_MIN for C++ compatibility
            const cppCompatibleArray = inputValue.map(val => val === null ? 'INT_MIN' : val);
            return `TreeNode* ${param.name} = arrayToBinaryTree({${cppCompatibleArray.join(', ')}});`;
        } else if (param.type === 'array') {
            // Check if this should be a 2D array (for points problems)
            if (Array.isArray(inputValue[0]) && typeof inputValue[0][0] === 'number') {
                // This is actually a 2D array (like points)
                const formatted2D = inputValue.map(row => `{${row.join(', ')}}`).join(', ');
                return `vector<vector<int>> ${param.name} = {${formatted2D}};`;
            } else if (Array.isArray(inputValue) && typeof inputValue[0] === 'string') {
                // Check if this should be treated as a character array using the helper function
                if (shouldUseCharArray(param, inputValue, metadata)) {
                    const charValues = inputValue.map(str => `'${str}'`).join(', ');
                    return `vector<char> ${param.name} = {${charValues}};`;
                } else {
                    // Keep as string array - this is the key fix
                    const formattedStrings = inputValue.map(item => `"${item}"`).join(', ');
                    return `vector<string> ${param.name} = {${formattedStrings}};`;
                }
            } else if (Array.isArray(inputValue) && inputValue.length > 0 && inputValue.every(item => typeof item === 'number')) {
                // Check if this should be converted to 2D array based on problem context
                // This is a heuristic for problems like "K Closest Points" where input is flattened
                if (inputValue.length % 2 === 0 && inputValue.length >= 4) {
                    // Might be points data - check function name or parameter name
                    if (param.name.toLowerCase().includes('point') || metadata.name.toLowerCase().includes('closest')) {
                        return `vector<vector<int>> ${param.name} = arrayTo2D({${inputValue.join(', ')}}, 2);`;
                    }
                }
                // Regular number array
                return `vector<int> ${param.name} = {${inputValue.join(', ')}};`;
            } else {
                // Handle mixed arrays or other cases as string array by default
                const formattedItems = inputValue.map(item => 
                    typeof item === 'string' ? `"${item}"` : item.toString()
                ).join(', ');
                return `vector<string> ${param.name} = {${formattedItems}};`;
            }
        } else if (param.type === '2dArray' || param.type === 'points') {
            // Explicitly handle 2D arrays
            const formatted2D = inputValue.map(row => `{${row.join(', ')}}`).join(', ');
            return `vector<vector<int>> ${param.name} = {${formatted2D}};`;
        } else if (param.type === 'stringArray') {
            // Explicitly handle string arrays
            const formattedStrings = inputValue.map(item => `"${item}"`).join(', ');
            return `vector<string> ${param.name} = {${formattedStrings}};`;
        } else if (param.type === 'charArray') {
            // Handle character arrays explicitly
            if (Array.isArray(inputValue) && typeof inputValue[0] === 'string') {
                const charValues = inputValue.map(str => `'${str[0] || 'A'}'`).join(', ');
                return `vector<char> ${param.name} = {${charValues}};`;
            }
            return `vector<char> ${param.name} = {${inputValue.join(', ')}};`;
        } else if (param.type === 'string') {
            return `string ${param.name} = "${inputValue}";`;
        } else if (param.type === 'number') {
            return `int ${param.name} = ${inputValue};`;
        } else {
            // Default case
            return `auto ${param.name} = ${JSON.stringify(inputValue)};`;
        }
    }).join('\n        ');

    const functionCall = `solution.${metadata.name}(${metadata.parameters.map(p => p.name).join(', ')})`;
    const hasLinkedListReturn = metadata.returnType === 'linkedlist';
    const hasBinaryTreeReturn = metadata.returnType === 'binarytree' || metadata.returnType === 'tree';
    const hasLinkedListParams = metadata.parameters.some(p => p.type === 'linkedlist');
    const hasBinaryTreeParams = metadata.parameters.some(p => p.type === 'binarytree' || p.type === 'tree');

    // Generate cleanup code for LinkedList and BinaryTree parameters
    let cleanupCode = '';
    if (hasLinkedListParams) {
        cleanupCode += metadata.parameters
            .filter(p => p.type === 'linkedlist')
            .map(p => `deleteLinkedList(${p.name});`)
            .join('\n        ');
    }
    if (hasBinaryTreeParams) {
        if (cleanupCode) cleanupCode += '\n        ';
        cleanupCode += metadata.parameters
            .filter(p => p.type === 'binarytree' || p.type === 'tree')
            .map(p => `deleteBinaryTree(${p.name});`)
            .join('\n        ');
    }

    const wrapper = `
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <unordered_map>
#include <unordered_set>
#include <stack>
#include <queue>
#include <climits>
#include <cmath>
using namespace std;

${treeAndLinkedListHelper}

// Generic result printer for int
void printResult(const vector<int>& vec) {
    for (size_t i = 0; i < vec.size(); i++) {
        if (vec[i] == INT_MIN) {
            cout << "null";
        } else {
            cout << vec[i];
        }
        if (i < vec.size() - 1) cout << ",";
    }
}

// Overloads for other types
void printResult(int val) { cout << val; }
void printResult(double val) { 
    if (val == floor(val)) {
        cout << static_cast<int>(val);
    } else {
        cout << val;
    }
}
void printResult(float val) { 
    if (val == floor(val)) {
        cout << static_cast<int>(val);
    } else {
        cout << val;
    }
}
void printResult(const string& val) { cout << val; }
void printResult(bool val) { cout << (val ? "true" : "false"); }

// Handle LinkedList results
void printResult(ListNode* head) {
    vector<int> arr = linkedListToArray(head);
    printResult(arr);
}

// Handle BinaryTree results
void printResult(TreeNode* root) {
    vector<int> arr = binaryTreeToArray(root);
    printResult(arr);
}

// Handle 2D arrays - flatten to comma-separated format
void printResult(const vector<vector<int>>& vec2d) {
    bool first = true;
    for (size_t i = 0; i < vec2d.size(); i++) {
        for (size_t j = 0; j < vec2d[i].size(); j++) {
            if (!first) cout << ",";
            cout << vec2d[i][j];
            first = false;
        }
    }
}

// Handle vector of strings
void printResult(const vector<string>& vec) {
    for (size_t i = 0; i < vec.size(); i++) {
        cout << vec[i];
        if (i < vec.size() - 1) cout << ",";
    }
}

// Handle vector of chars
void printResult(const vector<char>& vec) {
    for (size_t i = 0; i < vec.size(); i++) {
        cout << vec[i];
        if (i < vec.size() - 1) cout << ",";
    }
}

${code}

int main() {
    try {
        Solution solution;
        
        // Dynamically declare and initialize variables
        ${inputDeclarations}
        
        // Dynamically call the correct function
        auto result = ${functionCall};
        
        printResult(result);
        cout << endl;
        
        // Memory cleanup for LinkedList and BinaryTree parameters
        ${cleanupCode}
        
        ${hasLinkedListReturn ? `
        // Cleanup result if it's a LinkedList
        if constexpr (std::is_same_v<decltype(result), ListNode*>) {
            deleteLinkedList(result);
        }` : ''}
        
        ${hasBinaryTreeReturn ? `
        // Cleanup result if it's a BinaryTree
        if constexpr (std::is_same_v<decltype(result), TreeNode*>) {
            deleteBinaryTree(result);
        }` : ''}
        
    } catch (const exception& e) {
        cerr << "Runtime Error: " << e.what() << endl;
        return 1;
    }
    
    return 0;
}
`;
    return wrapper;
}
    getDockerImage(language) {
        const images = {
            'Python': 'python:3.9-slim',
            'Javascript': 'node:16-slim',
            'Cpp': 'gcc:9'
        };
        return images[language] || 'ubuntu:20.04';
    }

    getFileName(language) {
        const extensions = {
            'Python': 'solution.py',
            'Javascript': 'solution.js',
            'Cpp': 'solution.cpp'
        };
        return extensions[language] || 'solution.txt';
    }

    buildDockerCommand(dockerImage, language, fileName) {
        // Fix path issues - convert Windows paths to Unix-style for Docker
        const tempDir = this.tempDir.replace(/\\/g, '/');
        
        const commands = {
            'Python': `docker run --rm -v "${tempDir}:/app" -w /app ${dockerImage} python ${fileName}`,
            'Javascript': `docker run --rm -v "${tempDir}:/app" -w /app ${dockerImage} node ${fileName}`,
            'Cpp': `docker run --rm -v "${tempDir}:/app" -w /app ${dockerImage} bash -c "g++ -o solution ${fileName} && ./solution"`
        };
        
        return commands[language] || `docker run --rm -v "${tempDir}:/app" -w /app ${dockerImage} cat ${fileName}`;
    }

    executeWithTimeout(command, timeout) {
        return new Promise((resolve, reject) => {
            console.log(`Executing: ${command}`);
            
            const process = exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.log(`Execution error: ${error.message}`);
                    console.log(`Stderr: ${stderr}`);
                    reject(new Error(`${error.message}\nStderr: ${stderr}`));
                } else {
                    console.log(`Stdout: ${stdout}`);
                    resolve({ stdout, stderr });
                }
            });

            const timer = setTimeout(() => {
                process.kill('SIGKILL');
                reject(new Error('timeout'));
            }, timeout);

            // Clear timeout if process completes normally
            process.on('exit', () => clearTimeout(timer));
        });
    }

    cleanupFiles(filePaths) {
        filePaths.forEach(filePath => {
            try {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    console.log(`Cleaned up: ${filePath}`);
                }
            } catch (err) {
                console.log(`Cleanup error for ${filePath}: ${err.message}`);
            }
        });
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

const worker = new CodeExecutionWorker();
worker.start().catch(console.error);

module.exports = CodeExecutionWorker;