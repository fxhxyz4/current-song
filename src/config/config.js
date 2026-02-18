import dotenv from "dotenv";
import path from "path";

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const requireEnv = (name) => {
  const env = process.env[name];

  if (!env) throw new Error(`Missing env var ${name}`);
  return env;
};

export const DEBUG = process.env.DEBUG === "true";
export const TELEGRAM_ID = requireEnv("TELEGRAM_ID") || "";
export const TELEGRAM_HASH = requireEnv("TELEGRAM_HASH") || "";
export const SPOTIFY_ID = requireEnv("SPOTIFY_ID") || "";
export const SPOTIFY_SECRET = requireEnv("SPOTIFY_SECRET") || "";
export const REDIRECT_URI = requireEnv("REDIRECT_URI") || "";
export const REFRESH_TOKEN = requireEnv("REFRESH_TOKEN") || "";
