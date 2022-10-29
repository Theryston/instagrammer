import { getImage } from "./get-image.js";
import { postImage } from "./post-image.js";
import { PrismaClient } from "@prisma/client";
import { handleImage } from "./handle-image.js";

const prisma = new PrismaClient();

export async function createPost() {
  let image;
  try {
    image = await getImage();
    image.processedUrl = await handleImage(image.link);
    const post = await postImage({
      imageUrl: image.processedUrl,
      title: process.env.DEFAULT_HASHTAGS || "",
    });
    console.log(`Creating image ${image.processedUrl} in database`);
    const createdImage = await prisma.images.create({
      data: {
        mime: image.mime,
        rawUrl: image.link,
        url: image.processedUrl,
        title: image.title,
        status: "PUBLISHED",
      },
    });
    return {
      instagramId: post.id,
      instagramUrl: post.permalink,
      id: createdImage.id,
      url: createdImage.url,
    };
  } catch (e) {
    if (image) {
      await prisma.images.create({
        data: {
          mime: image.mime,
          rawUrl: image.link,
          title: image.title,
          status: "ERROR",
          url: image.processedUrl || "",
        },
      });
    }
    throw e;
  }
}
