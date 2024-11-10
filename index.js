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

  // Run npm install
  execSync("npm install", { cwd: destFolder, stdio: "inherit" });

  // Optionally install Expo CLI dependencies
  console.log("Installing Expo CLI dependencies...");
  execSync("npm install expo", { cwd: destFolder, stdio: "inherit" });
}

async function main() {
  const projectName = process.argv[2] || "my-expo-app";
  const isCurrentDir = projectName === ".";
  const projectPath = isCurrentDir
    ? process.cwd()
    : path.resolve(process.cwd(), projectName);

  if (!isCurrentDir && fs.existsSync(projectPath)) {
    console.log(`Error: Directory ${projectName} already exists.`);
    process.exit(1);
  }

  if (!isCurrentDir) {
    fs.mkdirSync(projectPath);
  }

  copyTemplate(projectPath);
  installDependencies(projectPath);

  console.log("Expo app created successfully!");

  // Optionally, start Expo's development server

  // console.log("Starting Expo development server...");
  // execSync("npx expo start", { cwd: projectPath, stdio: "inherit" });
}

main();
