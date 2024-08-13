# Scripts

## Check Docs

The `check_docs.cjs` script is a utility for automatically updating and maintaining documentation in TypeScript files. It recursively processes TypeScript files in a specified directory, ensuring that the documentation follows a consistent style guide.

### Features:
- Recursively processes TypeScript files in a given directory
- Updates documentation comments (starting with ///) if needed
- Maintains existing code while only modifying documentation
- Follows a specific style guide for documentation

### Usage:

To run the script, use the following command in the terminal:

```
node check_docs.cjs [subdirectory]
```

- If no subdirectory is specified, the script will process all TypeScript files in the `src` directory.
- To process a specific subdirectory within `src`, provide the subdirectory name as an argument.

Example:
```
node check_docs.cjs components
```

This will process all TypeScript files in the `src/components` directory.

Note: The script requires the `refactor` command to be available in your system's PATH.
