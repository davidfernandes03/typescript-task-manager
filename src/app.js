"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
// -----------------------------
// Custom Error Class
// -----------------------------
class TaskNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "TaskNotFoundError";
    }
}
// -----------------------------
// TaskManager Class
// -----------------------------
class TaskManager {
    tasks = [];
    nextId = 1;
    // Add a new task
    addTask(title) {
        const newTask = {
            id: this.nextId++,
            title,
            completed: false
        };
        this.tasks.push(newTask);
        console.log(`✅ Task added: ${title}`);
    }
    // Complete task
    completeTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (!task) {
            throw new TaskNotFoundError(`Task with ID ${id} not found`);
        }
        task.completed = true;
        console.log(`🎉 Task completed: ${task.title}`);
    }
    // List tasks
    listTasks() {
        if (this.tasks.length === 0) {
            console.log("\n📭 No tasks yet.");
            return;
        }
        console.log("\n📋 Task List:");
        this.tasks.forEach(task => {
            console.log(`${task.id}. ${task.title} - ${task.completed ? "Completed" : "Pending"}`);
        });
    }
    // -----------------------------
    // Recursion: Count pending tasks
    // -----------------------------
    countPending(tasks = this.tasks, index = 0) {
        if (index >= tasks.length)
            return 0;
        const current = tasks[index].completed ? 0 : 1;
        return current + this.countPending(tasks, index + 1);
    }
    // -----------------------------
    // Async: Simulate fetching tasks
    // -----------------------------
    async fetchSampleTasks() {
        console.log("⏳ Fetching sample tasks...");
        return new Promise(resolve => {
            setTimeout(() => {
                this.addTask("Learn TypeScript");
                this.addTask("Build a project");
                console.log("📥 Sample tasks loaded!");
                resolve();
            }, 1000);
        });
    }
}
// -----------------------------
// CLI (Interactive Menu)
// -----------------------------
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}
// -----------------------------
// Main Program
// -----------------------------
async function main() {
    const manager = new TaskManager();
    await manager.fetchSampleTasks();
    let running = true;
    while (running) {
        console.log(`
📌 MENU
1 - List tasks
2 - Add task
3 - Complete task
4 - Count pending tasks (recursion)
5 - Exit
`);
        const choice = await ask("Choose an option: ");
        try {
            switch (choice.trim()) {
                case "1":
                    manager.listTasks();
                    break;
                case "2":
                    const title = await ask("Enter task title: ");
                    manager.addTask(title);
                    break;
                case "3":
                    const idInput = await ask("Enter task ID to complete: ");
                    const id = parseInt(idInput);
                    if (isNaN(id)) {
                        console.log("⚠️ Please enter a valid number.");
                        break;
                    }
                    manager.completeTask(id);
                    break;
                case "4":
                    const pending = manager.countPending();
                    console.log(`🧮 Pending tasks: ${pending}`);
                    break;
                case "5":
                    running = false;
                    break;
                default:
                    console.log("⚠️ Invalid option. Try again.");
            }
        }
        catch (error) {
            if (error instanceof TaskNotFoundError) {
                console.error(`❌ ${error.message}`);
            }
            else {
                console.error("Unexpected error occurred");
            }
        }
    }
    rl.close();
    console.log("👋 Goodbye!");
}
main();
//# sourceMappingURL=app.js.map