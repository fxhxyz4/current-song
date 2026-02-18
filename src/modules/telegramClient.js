import { StringSession } from "telegram/sessions/index.js";
import { TelegramClient } from "telegram";
import { startPool } from "./startPool.js";

// apiId, apiHash = TELEGRAM_ID, TELEGRAM_HASH
export const initTelegramClient = async ({
  sessionString,
  apiId,
  apiHash,
  prompt,
}) => {
  const stringSession = new StringSession(sessionString || "");

  const client = new TelegramClient(stringSession, Number(apiId), apiHash, {
    connectionRetries: 5,
  });

  await client.start({
    phoneNumber: async () =>
      await prompt.question("Please enter your number: "),
    password: async () => await prompt.question("Please enter your password: "),
    phoneCode: async () =>
      await prompt.question("Please enter the code you received: "),
    onError: (err) => console.error("Telegram start error:", err),
  });

  void startPool(client);
  return { client, stringSession };
};

export const sendHello = async (client, target = "me", message) => {
  await client.sendMessage(target, {
    message: message,
  });
};
