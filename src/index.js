import { createPost } from "./create-post/index.js";
import { config } from "dotenv";
import cron from "node-cron";
import cronParser from "cron-parser";

config();

let attempts = 0;

const run = async () => {
  try {
    console.log(`Running at: ${new Date().toLocaleString()}`);
    const image = await createPost();
    attempts = 0;
    console.log(`Published post: ${image.url}`);
  } catch (e) {
    console.log(
      `Error publishing post: ${e.message} | ${
        attempts < 5 ? "Retrying..." : "Giving up."
      }`
    );
    if (attempts < 5) {
      attempts++;
      await run();
    }
  }
};

const main = async () => {
  if (!process.env.POST_EVERY_HOURS) {
    console.log("No POST_EVERY_HOURS env var set. Running once.");
    await run();
    return;
  }

  const cronExpression = `0 */${process.env.POST_EVERY_HOURS} * * *`;

  const interval = cronParser.parseExpression(cronExpression);
  let nextExecution = interval.next().toDate();

  console.log(
    `The robot has started! leave it running and come back here when you need to see some logs.`
  );
  console.log(`Started at: ${new Date().toLocaleString()}`);
  console.log(
    `The first post will be made at: ${nextExecution.toLocaleString()}`
  );

  cron.schedule(cronExpression, async () => {
    await run();
    nextExecution = interval.next().toDate();
    console.log(`Finished at: ${new Date().toLocaleString()}`);
    console.log(`Next post at: ${nextExecution.toLocaleString()}`);
  });
};

main();
