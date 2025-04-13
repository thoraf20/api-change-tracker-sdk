import fs from "fs";
import path from "path";

let config: any = {};

export function loadConfig() {
  const configPath = path.join(__dirname, "../../tracker.config.json");
  if (!fs.existsSync(configPath)) {
    console.warn("No config file found.");
    return;
  }

  const raw = fs.readFileSync(configPath, "utf-8");
  config = JSON.parse(raw);
  console.log("Loaded config:", config);
}

export function getConfig() {
  return config;
}
