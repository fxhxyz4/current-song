import path from "path";
import fs from "fs";

const SESSION_PATH = path.resolve(process.cwd(), "telegram.session");

export const loadSession = () => {
  try {
    return fs.readFileSync(SESSION_PATH, "utf8") || "";
  } catch (err) {
    return "";
  }
};

export const saveSession = (sessionString) => {
  fs.writeFileSync(SESSION_PATH, sessionString, { encoding: "utf8" });
};
