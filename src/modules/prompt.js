import readline from "readline";

export const createPrompt = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (query) => {
    return new Promise((resolve) => rl.question(query, resolve));
  };

  const close = () => {
    rl.close();
  };

  return { question, close };
};
