import { exec } from "child_process";
import { promisify } from "util";

const execSync = promisify(exec);

const spinner = createSpinner();

const run = async () => {
  try {
    spinner.start({
      text: "Preparing database...",
    });
    await execSync("pnpm prisma generate && pnpm prisma db push");
    spinner.success({
      text: "Database ready!",
    });
  } catch (e) {
    spinner.error({
      text: `Error running prisma generate: ${e.message}`,
    });
  }
};

run();
