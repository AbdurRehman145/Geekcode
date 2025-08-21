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

                const result = await this.runSingleTest(code, language, testCase);
                
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

    async runSingleTest(code, language, testCase) {
        const dockerImage = this.getDockerImage(language);
        const filename = this.getFileName(language);
        const filePath = path.join(this.tempDir, filename);

        try {
            // Prepare code with test case input
            let modifiedCode = this.prepareCodeForExecution(code, language, testCase.input);
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

    prepareCodeForExecution(code, language, input) {
        switch(language) {
            case 'Python':
                return this.preparePythonCode(code, input);
            case 'Javascript':
                return this.prepareJavascriptCode(code, input);
            case 'Cpp':
                return this.prepareCppCode(code, input);
            default:
                return code;
        }
    }

   preparePythonCode(code, input) {
    // Handle object input format from test cases
    let inputStr = '';
    if (input && typeof input === 'object' && input.nums && input.target !== undefined) {
        inputStr = `        nums = ${JSON.stringify(input.nums)}\n        target = ${input.target}`;
    } 
    // Handle array format [nums, target]
    else if (Array.isArray(input) && input.length === 2) {
        inputStr = `        nums = ${JSON.stringify(input[0])}\n        target = ${input[1]}`;
    } 
    // Fallback for other formats
    else {
        inputStr = `        test_input = ${JSON.stringify(input)}`;
    }

    // Use proper Python indentation - no leading spaces in template literal
    const wrapper = `import sys
# User's solution code
${code}

# Test execution
def main():
    try:
        # Input variables
${inputStr}
        
        # Create solution instance
        solution = Solution()
        
        # Execute the method
        if 'nums' in locals() and 'target' in locals():
            result = solution.twoSum(nums, target)
        elif 'test_input' in locals():
            result = solution.solve(test_input)
        else:
            result = []
        
        # Format output to match expected format (comma-separated)
        if isinstance(result, list):
            print(','.join(map(str, result)))
        else:
            print(result)
        
    except Exception as e:
        print(f"Runtime Error: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()`;
    
    return wrapper;
}
    prepareJavascriptCode(code, input) {
        let inputStr = '';
        
        // Handle object input format from test cases
        if (input && typeof input === 'object' && input.nums && input.target !== undefined) {
            inputStr = `const nums = ${JSON.stringify(input.nums)};\nconst target = ${input.target};`;
        } 
        // Handle array format [nums, target]
        else if (Array.isArray(input) && input.length === 2) {
            inputStr = `const nums = ${JSON.stringify(input[0])};\nconst target = ${input[1]};`;
        } 
        // Fallback for other formats
        else {
            inputStr = `const testInput = ${JSON.stringify(input)};`;
        }

        const wrapper = `
// User's solution code
${code}

// Test execution
function main() {
    try {
        ${inputStr}
        
        let result;
        
        // Try to find Solution class or function
        if (typeof Solution !== 'undefined') {
            const solution = new Solution();
            
            if (typeof nums !== 'undefined' && typeof target !== 'undefined') {
                result = solution.twoSum(nums, target);
            } else if (typeof testInput !== 'undefined') {
                result = solution.solve(testInput);
            }
        }
        
        // Format output to match expected format (comma-separated without brackets)
        if (Array.isArray(result)) {
            console.log(result.join(','));
        } else {
            console.log(result);
        }
        
    } catch (error) {
        console.log(\`Runtime Error: \${error.message}\`);
        process.exit(1);
    }
}

main();
`;

        return wrapper;
    }

    prepareCppCode(code, input) {
        let inputDeclarations = '';
        
        // Handle object input format from test cases
        if (input && typeof input === 'object' && input.nums && input.target !== undefined) {
            const nums = input.nums;
            const target = input.target;
            const numsStr = `{${nums.join(', ')}}`;
            inputDeclarations = `    vector<int> nums = ${numsStr};\n    int target = ${target};`;
        }
        // Handle array format [nums, target]  
        else if (Array.isArray(input) && input.length === 2) {
            const nums = input[0];
            const target = input[1];
            const numsStr = `{${nums.join(', ')}}`;
            inputDeclarations = `    vector<int> nums = ${numsStr};\n    int target = ${target};`;
        }

        const wrapper = `
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <unordered_map>
using namespace std;

${code}

void printVector(const vector<int>& vec) {
    for (size_t i = 0; i < vec.size(); i++) {
        cout << vec[i];
        if (i < vec.size() - 1) cout << ",";
    }
}

int main() {
    try {
${inputDeclarations}
        
        Solution solution;
        auto result = solution.twoSum(nums, target);
        
        printVector(result);
        cout << endl;
        
    } catch (const exception& e) {
        cout << "Runtime Error: " << e.what() << endl;
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