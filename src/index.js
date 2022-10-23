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

console.log(process.env.INSTAGRAM_USERNAME);

console.log(
  `The robot has started! leave it running and come back here when you need to see some logs.`
);
console.log(`Started at: ${new Date().toLocaleString()}`);
console.log(
  `The first post will be made at: ${new Date(
    Date.now() + 43200000
  ).toLocaleString()}`
);

cron.schedule("0 */12 * * *", async () => {
  await run();
  console.log(`Finished at: ${new Date().toLocaleString()}`);
  console.log(
    `Next post at: ${new Date(Date.now() + 43200000).toLocaleString()}`
  );
});
