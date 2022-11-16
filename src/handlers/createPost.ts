import { createPost } from "../create-post";

let attempts = 0;

export async function run() {
  try {
    console.log(`Running at: ${new Date().toLocaleString()}`);
    const image = await createPost();
    attempts = 0;
    console.log(`Published post: ${image.instagramUrl}`);
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
}
