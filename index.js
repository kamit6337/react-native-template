#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function copyTemplate(destFolder) {
  const templatePath = path.join(__dirname, "template");
  fs.cpSync(templatePath, destFolder, { recursive: true });
  console.log("Template files copied successfully.");
}

function installDependencies(destFolder) {
  console.log("Installing dependencies...");
  execSync("npm install", { cwd: destFolder, stdio: "inherit" });
}

async function main() {
  const projectName = process.argv[2] || "my-react-app";
  const projectPath = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(projectPath)) {
    console.log(`Error: Directory ${projectName} already exists.`);
    process.exit(1);
  }

  fs.mkdirSync(projectPath);
  copyTemplate(projectPath);
  installDependencies(projectPath);

  console.log("React app created successfully!");
}

main();
