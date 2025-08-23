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
    // Dynamically create variable assignments from input array and metadata
    const inputAssignments = metadata.parameters
        .map((param, index) => `        ${param.name} = ${JSON.stringify(input[index])}`)
        .join('\n');

    const functionCall = `solution.${metadata.name}(${metadata.parameters.map(p => p.name).join(', ')})`;

    const wrapper = `
import sys
import json

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
        
        # Format output for consistency
        if isinstance(result, list):
            # For lists, print as a comma-separated string
            print(','.join(map(str, result)))
        elif isinstance(result, bool):
            # Convert Python boolean to lowercase string
            print(str(result).lower())
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
    const inputAssignments = metadata.parameters
        .map((param, index) => `const ${param.name} = ${JSON.stringify(input[index])};`)
        .join('\n');
    
    const functionCall = `solution.${metadata.name}(${metadata.parameters.map(p => p.name).join(', ')})`;

    const wrapper = `
// User's solution code
${code}

// Test execution
function main() {
    try {
        const solution = new Solution();
        
        // Input variables
${inputAssignments}
        
        // Dynamic function call
        const result = ${functionCall};
        
        // Format output
        if (Array.isArray(result)) {
            console.log(result.join(','));
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

prepareCppCode(code, input, metadata) {
    // This is more complex due to C++'s static typing.
    // We'll map JS types to C++ types. Extend this map as needed.
    const typeMap = {
        'number': 'int',
        'string': 'string',
        'array': 'vector<int>' // Assuming array of ints for now
    };

    const inputDeclarations = metadata.parameters.map((param, index) => {
        const cppType = typeMap[param.type];
        if (param.type === 'array') {
            return `${cppType} ${param.name} = {${input[index].join(', ')}};`;
        }
        return `${cppType} ${param.name} = ${JSON.stringify(input[index])};`;
    }).join('\n    ');

    const functionCall = `solution.${metadata.name}(${metadata.parameters.map(p => p.name).join(', ')})`;

    // Note: The printVector function needs to be generic too.
    const wrapper = `
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <unordered_map>
#include <unordered_set>

using namespace std;

// Generic vector printer for int
void printResult(const vector<int>& vec) {
    for (size_t i = 0; i < vec.size(); i++) {
        cout << vec[i];
        if (i < vec.size() - 1) cout << ",";
    }
}

// Overload for other types
void printResult(int val) { cout << val; }
void printResult(const string& val) { cout << val; }
void printResult(bool val) { cout << (val ? "true" : "false"); }
// Add this overload to handle vector<vector<int>> (2D arrays)
void printResult(const vector<vector<int>>& vec2d) {
    cout << "[";
    for (size_t i = 0; i < vec2d.size(); i++) {
        cout << "[";
        for (size_t j = 0; j < vec2d[i].size(); j++) {
            cout << vec2d[i][j];
            if (j < vec2d[i].size() - 1) cout << ",";
        }
        cout << "]";
        if (i < vec2d.size() - 1) cout << ",";
    }
    cout << "]";
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