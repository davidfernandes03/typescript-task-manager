# Overview

My main goal with this project was to get comfortable writing real TypeScript. I wanted to understand how type safety actually helps during development and how it changes the way I structure code compared to JavaScript.

The software I built is a small Task Manager. It allows the user to add tasks, mark them as completed, list all tasks, and count how many are still pending using recursion. It also simulates loading tasks asynchronously to practice async/await and includes a custom error class to handle cases where a task ID does not exist.

I wrote this project to practice TypeScript concepts in a practical way: interfaces, classes, strict typing, error handling, recursion, and working with Node in an interactive CLI. I also focused on making the terminal output more readable with colors.

[Software Demo Video](https://youtu.be/2P1ffbDPoXc)

# Development Environment

I used Node.js, TypeScript, and the built-in readline module to create an interactive command-line application. The project was compiled using tsc and run with Node.

TypeScript was configured in strict mode, which helped me catch issues like possibly undefined values and missing types for Node. I also used @types/node for proper type support in the development environment.

The entire project was written in TypeScript without external libraries, focusing on understanding the language itself rather than relying on frameworks.

# Useful Websites

- [Typescript official site](https://www.typescriptlang.org/)

# Future Work

- Save and load tasks from a JSON file so data can persist between runs
- Add filters (show only completed or only pending tasks)
- Delete tasks implementation