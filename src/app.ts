import * as readline from "readline";

// -----------------------------
// Terminal Colors (ANSI)
// -----------------------------
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",

  fgGreen: "\x1b[32m",
  fgYellow: "\x1b[33m",
  fgCyan: "\x1b[36m",
  fgRed: "\x1b[31m"
};

function green(text: string) {
  return `${colors.fgGreen}${text}${colors.reset}`;
}

function yellow(text: string) {
  return `${colors.fgYellow}${text}${colors.reset}`;
}

function cyan(text: string) {
  return `${colors.fgCyan}${text}${colors.reset}`;
}

function red(text: string) {
  return `${colors.fgRed}${text}${colors.reset}`;
}

function bold(text: string) {
  return `${colors.bright}${text}${colors.reset}`;
}

// -----------------------------
// Task interface (type safety)
// -----------------------------
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

// -----------------------------
// Custom Error Class
// -----------------------------
class TaskNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TaskNotFoundError";
  }
}

// -----------------------------
// TaskManager Class
// -----------------------------
class TaskManager {
  private tasks: Task[] = [];
  private nextId: number = 1;

  // Add a new task
  addTask(title: string): void {
    const newTask: Task = {
      id: this.nextId++,
      title,
      completed: false
    };

    this.tasks.push(newTask);
    console.log(green(`✅ Task added:`) + ` ${title}`);
  }

  // Complete task
  completeTask(id: number): void {
    const task = this.tasks.find(t => t.id === id);

    if (!task) {
      throw new TaskNotFoundError(`Task with ID ${id} not found`);
    }

    task.completed = true;
    console.log(green(`🎉 Task completed:`) + ` ${task.title}`);
  }

  // List tasks
    listTasks(): void {
        if (this.tasks.length === 0) {
            console.log("\n📭 No tasks yet.");
            return;
        }

        console.log("\n" + bold("📋 Task List:"));

        this.tasks.forEach(task => {
            const status = task.completed
            ? green("✔ Completed")
            : yellow("⏳ Pending");

            console.log(
            `${cyan(task.id.toString().padStart(2, "0"))} │ ${task.title} │ ${status}`
            );
        });
    }

  // -----------------------------
  // Recursion: Count pending tasks
  // -----------------------------
    countPending(tasks: Task[] = this.tasks, index: number = 0): number {
        if (index >= tasks.length) return 0;

        const task = tasks[index];
        if (!task) return 0;

        const current = task.completed ? 0 : 1;
        return current + this.countPending(tasks, index + 1);
    }

  // -----------------------------
  // Async: Simulate fetching tasks
  // -----------------------------
    async fetchSampleTasks(): Promise<void> {
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

function ask(question: string): Promise<string> {
  return new Promise(resolve => rl.question(question, resolve));
}

// -----------------------------
// Main Program
// -----------------------------
async function main(): Promise<void> {
  const manager = new TaskManager();

  await manager.fetchSampleTasks();

  let running = true;

  while (running) {
    console.log(cyan("────────────────────────────"));
    console.log(`
${bold("📌 MENU")}
${cyan("1")} - List tasks
${cyan("2")} - Add task
${cyan("3")} - Complete task
${cyan("4")} - Count pending tasks
${cyan("5")} - Exit
`);

    const choice = await ask(bold("👉 Choose an option: "));

    try {
      switch (choice.trim()) {
        case "1":
          manager.listTasks();
          break;

        case "2":
          const title = await ask("📝 Enter task title: ");
          manager.addTask(title);
          break;

        case "3":
          const idInput = await ask("🔢 Enter task ID to complete: ");
          const id = parseInt(idInput);

          if (isNaN(id)) {
            console.log("⚠️ Please enter a valid number.");
            break;
          }

          manager.completeTask(id);
          break;

        case "4":
          const pending = manager.countPending();
          console.log(cyan(`🧮 Pending tasks:`) + ` ${yellow(pending.toString())}`);

          break;

        case "5":
          running = false;
          break;

        default:
          console.log("⚠️ Invalid option. Try again.");
      }
    } catch (error) {
      if (error instanceof TaskNotFoundError) {
        console.error(red(`❌ ${error.message}`));
      } else {
        console.error("Unexpected error occurred");
      }
    }
  }

  rl.close();
  console.log("👋 Goodbye!");
}

// Update: npx tsc
// Run: node dist/app.js

main();
