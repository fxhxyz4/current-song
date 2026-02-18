import dotenv from "dotenv";
import http from "http";
import path from "path";

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const { SPOTIFY_ID, SPOTIFY_SECRET, REDIRECT_URI } = process.env;

const SCOPES = "user-read-currently-playing user-read-playback-state";

const authUrl =
  "https://accounts.spotify.com/authorize" +
  `?client_id=${encodeURIComponent(SPOTIFY_ID)}` +
  `&response_type=code` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&scope=${encodeURIComponent(SCOPES)}`;

console.log("\n1) Add this Redirect URI in Spotify Dashboard:");
console.log("   " + REDIRECT_URI);
console.log("\n2) Open this URL in your browser:\n");
console.log(authUrl + "\n");

const server = http.createServer(async (req, res) => {
  try {
    const u = new URL(req.url, REDIRECT_URI);

    if (u.pathname !== "/callback") {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
      return;
    }

    const err = u.searchParams.get("error");
    if (err) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Spotify returned error: " + err);
      return;
    }

    const code = u.searchParams.get("code");
    if (!code) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Missing code in callback URL");
      return;
    }

    const basic = Buffer.from(`${SPOTIFY_ID}:${SPOTIFY_SECRET}`).toString(
      "base64",
    );

    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    });

    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    const text = await tokenRes.text();

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("OK. Check your terminal output.\nYou can close this tab.");

    if (!tokenRes.ok) {
      console.error("\nToken exchange failed:", tokenRes.status, text);
      process.exit(1);
    }

    const data = JSON.parse(text);

    console.log("\n=== SUCCESS ===");
    console.log("scope:", data.scope);
    console.log("expires_in:", data.expires_in);
    console.log("\nREFRESH_TOKEN:\n" + data.refresh_token + "\n");
    console.log("Put it in .env as:");
    console.log(`REFRESH_TOKEN=${data.refresh_token}\n`);

    process.exit(0);
  } catch (e) {
    console.error("Server error:", e);
    try {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Server error");
    } catch {}
    process.exit(1);
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on http://127.0.0.1:3000");
});
