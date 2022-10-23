import { execSync } from "child_process";
import loading from "loading-cli";

const spinner = new loading({
  color: "yellow",
});

const run = async () => {
  try {
    spinner.start("Preparing the database...");
    execSync("pnpm prisma generate && pnpm prisma db push");
    spinner.succeed("Database ready!");
  } catch (e) {
    spinner.fail(`Error running prisma generate: ${e.message}`);
  }
};

run();
