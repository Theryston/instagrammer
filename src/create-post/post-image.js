import { IgApiClient } from "instagram-private-api";
import fs from "fs";

const ig = new IgApiClient();

export async function postImage({ imagePath, title = "" }) {
  if (!process.env.INSTAGRAM_USERNAME || !process.env.INSTAGRAM_PASSWORD) {
    throw new Error(
      "Please set the INSTAGRAM_USERNAME and INSTAGRAM_PASSWORD environment variables."
    );
  }

  ig.state.generateDevice(process.env.INSTAGRAM_USERNAME);

  await ig.simulate.preLoginFlow();
  await ig.account.login(
    process.env.INSTAGRAM_USERNAME,
    process.env.INSTAGRAM_PASSWORD
  );

  const image = fs.readFileSync(imagePath);

  const publishResult = await ig.publish.photo({
    file: image,
    caption: title,
  });

  return publishResult;
}
