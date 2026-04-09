class DownloadTask {
  private fileName: string;
  private status: string = "idle";
  private progress: number = 0;
  private interval: number = 0;

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  setFileName(fileName: string): void {
    this.fileName = fileName;
  }

  getFileName(): string {
    return this.fileName;
  }

  getStatus() {
    return this.status;
  }

  start() {
    if (this.status === "idle" || this.status === "paused") {
      this.status = "downloading";
      console.log(`Start ${this.fileName}`);
      this.simulateDownload();
    }
  }

  pause() {
    if (this.status === "downloading") {
      this.status = "paused";
      clearInterval(this.interval);
      console.log(`Paused ${this.fileName} at ${this.progress}%`);
    }
  }

  private simulateDownload() {
    clearInterval(this.interval);
    const speed = 10; 
    this.interval = setInterval(() => {
      if (this.progress >= 100) {
        this.status = "completed";
        clearInterval(this.interval);
        console.log(`Completed ${this.fileName}`);
      } else {
        this.progress += speed;
        console.log(`Downloading ${this.fileName}: ${this.progress}%`);
        console.log(`------------------------------`);
      }
    }, 300);
  }
}

interface Command {
  execute(): void;
}

class StartCommand implements Command {
  private receiver: DownloadTask; 

  constructor(receiver: DownloadTask) {
    this.receiver = receiver;
  }

  execute() {
    this.receiver.start();
  }
}

class PauseCommand implements Command {
  private receiver: DownloadTask;

  constructor(receiver: DownloadTask) {
    this.receiver = receiver;
  }

  execute() {
    if (this.receiver.getStatus() === "downloading") {
       console.log(`[Command Executor]: Attempting to pause ${this.receiver.getFileName()}...`);
       this.receiver.pause();
    }
  }
}

class RenameCommand implements Command {
  private receiver: DownloadTask;
  private newName: string; 

  constructor(receiver: DownloadTask, newName: string) {
    this.receiver = receiver;
    this.newName = newName;
  }

  execute() {
    const previousName = this.receiver.getFileName();
    this.receiver.setFileName(this.newName);
    console.log(`[Rename]: File renamed from '${previousName}' to '${this.newName}'`);
  }
}

class CommandExecutor {
  private command: Command | null = null;

  setCommand(command: Command): void {
    this.command = command;
  }

  executeCommand(): void {
    if (this.command) {
      this.command.execute(); 
    } else {
      console.log("No command set.");
    }
  }
}

const file = new DownloadTask("😊example_file.zip");
const invoker = new CommandExecutor();

console.log("--- Test: Start Download ---");
const startCmd = new StartCommand(file);
invoker.setCommand(startCmd);
invoker.executeCommand();
const pauseCmd = new PauseCommand(file);
setTimeout(() => {
  console.log("\n--- Test: Pause Download ---");
  invoker.setCommand(pauseCmd);
  invoker.executeCommand();
}, 1000);

setTimeout(() => {
  console.log("\n--- Test: Rename File ---");
  const renameCmd = new RenameCommand(file, "😊renamed_file.zip");
  invoker.setCommand(renameCmd);
  invoker.executeCommand();
}, 2000);

setTimeout(() => {
  console.log("\n--- Test: Resume Download ---");
  invoker.setCommand(startCmd);
  invoker.executeCommand();
}, 3000);

const file1 = new DownloadTask("📌file1.zip");
file1.start();
file1.pause();
file1.setFileName("📌file1_renamed.zip");
console.log(`File name after renaming: ${file1.getFileName()}`);
file1.start();

const app = new CommandExecutor();
app.setCommand(startCmd);
app.executeCommand();
app.setCommand(pauseCmd);
app.executeCommand();
app.setCommand(startCmd);