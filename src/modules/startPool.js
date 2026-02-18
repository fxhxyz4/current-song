import { getTrackInfo } from "./getTrackInfo.js";
import { DEBUG } from "../config/config.js";
import { setBio } from "./setBio.js";

let reconnectCount = 0;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const startPool = async (client) => {
  let lastTrackName = null;

  while (true) {
    try {
      if (!client.connected) {
        console.log("[TG] reconnect...");
        await client.connect();

        console.log("[TG] reconnected");

        reconnectCount++;
        if (DEBUG) console.log(`[LOG] Reconnect count: ${reconnectCount}`);
      }

      const trackName = await getTrackInfo();

      if (!trackName) {
        await sleep(5000);
        continue;
      }

      if (trackName && trackName !== lastTrackName) {
        await setBio(client, trackName);
        lastTrackName = trackName;
      }

      const waitMs = Number(global.trackTime);

      const delay = Number.isFinite(waitMs)
        ? Math.min(15000, Math.max(1500, waitMs))
        : 7000;

      await sleep(delay);
    } catch (e) {
      console.error("startPool error:", e);
      await sleep(5000);
    }
  }
};

export { startPool };
