import { createPost } from "./create-post/index.js";
import { config } from "dotenv";
import cron from "node-cron";
import loading from "loading-cli";

const spinner = new loading({
  color: "yellow",
});

config();

const run = async () => {
  let attempts = 0;
  try {
    spinner.start("Publishing post...");
    const image = await createPost();
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

console.log(
  `The robot has started! leave it running and come back here when you need to see some logs.`
);

cron.schedule("0 */12 * * *", run);
