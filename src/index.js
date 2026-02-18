import { initTelegramClient, sendHello } from "./modules/telegramClient.js";
import { TELEGRAM_ID, TELEGRAM_HASH } from "./config/config.js";
import { loadSession, saveSession } from "./modules/session.js";
import { greetingMessage } from "./modules/greetMsg.js";
import { createPrompt } from "./modules/prompt.js";

(async () => {
  const prompt = createPrompt();

  try {
    const existingSession = loadSession();
    console.log("Starting Telegram client...");

    const { client, stringSession } = await initTelegramClient({
      sessionString: existingSession,
      apiId: TELEGRAM_ID,
      apiHash: TELEGRAM_HASH,
      prompt,
    });

    console.log("Connected. Saving session...");
    saveSession(stringSession.save());

    await sendHello(client, "me", greetingMessage);

    console.log("Done.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    prompt.close();
  }
})();
