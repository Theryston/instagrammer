import { createPost } from "./create-post/index.js";
import { config } from "dotenv";
import cron from "node-cron";
import loading from "loading-cli";

const spinner = new loading({
  color: "yellow",
});

config();

let attempts = 0;

const run = async () => {
  try {
    spinner.start("Publishing post...");
    const image = await createPost();
    attempts = 0;
    spinner.succeed(`Published post: ${image.url}`);
  } catch (e) {
    spinner.fail(
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

  console.log(
    `The robot has started! leave it running and come back here when you need to see some logs.`
  );
  console.log(`Started at: ${new Date().toLocaleString()}`);
  console.log(
    `The first post will be made at: ${new Date(
      Date.now() + 1000 * 60 * 60 * process.env.POST_EVERY_HOURS
    ).toLocaleString()}`
  );

  cron.schedule(`0 */${process.env.POST_EVERY_HOURS} * * *`, async () => {
    await run();
    console.log(`Finished at: ${new Date().toLocaleString()}`);
    console.log(
      `Next post at: ${new Date(
        Date.now() + 1000 * 60 * 60 * process.env.POST_EVERY_HOURS
      ).toLocaleString()}`
    );
  });
};

main();
