const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function process_typescript_files(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const file_path = path.join(directory, file);
    const stat = fs.statSync(file_path);

    if (stat.isDirectory()) {
      process_typescript_files(file_path);
    } else if (path.extname(file) === '.ts') {
      const request = 'update the documentation of this file if needed. DO NOT remove ANYTHING different than documentation. The documentation should follow the same style guide as the rest of the directory. Doc comments start with ///. You should describe the function, its args and its return. The documentation should always be on top of the imports. You should specifie arguments like: # Arguments \n - arg1 and same for return';
      const command = `refactor "${file_path}" "${request}"`;
      
      try {
        execSync(command, { stdio: 'inherit' });
      } catch (error) {
        console.error(`Error processing file ${file_path}:`, error.message);
      }
    }
  }
}

const src_directory = path.join(__dirname, '..', 'src');
const target_directory = process.argv[2] ? path.join(src_directory, process.argv[2]) : src_directory;
console.log("Processing target: ", target_directory);

if (fs.existsSync(target_directory)) {
  process_typescript_files(target_directory);
} else {
  console.error(`Directory not found: ${target_directory}`);
}
