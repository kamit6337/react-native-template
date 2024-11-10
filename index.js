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

  // Run npm install (you can change this to yarn if you prefer)
  execSync("npm install", { cwd: destFolder, stdio: "inherit" });

  // Optional: If you want to ensure that Expo dependencies are installed properly
  console.log("Installing Expo CLI dependencies...");
  execSync("npm install expo", { cwd: destFolder, stdio: "inherit" });
}

async function main() {
  const projectName = process.argv[2] || "my-expo-app";
  const projectPath = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(projectPath)) {
    console.log(`Error: Directory ${projectName} already exists.`);
    process.exit(1);
  }

  fs.mkdirSync(projectPath);
  copyTemplate(projectPath);
  installDependencies(projectPath);

  console.log("Expo app created successfully!");

  // Optionally, you can even run Expo's development server right after setup
  // console.log("Starting Expo development server...");
  // execSync("npx expo start", { cwd: projectPath, stdio: "inherit" });
}

main();
