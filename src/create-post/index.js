import { getImage } from "./get-image.js";
import { postImage } from "./post-image.js";
import { PrismaClient } from "@prisma/client";
import { handleImage } from "./handle-image.js";

const prisma = new PrismaClient();

export async function createPost() {
  let image;
  try {
    image = await getImage();
    image.processedUrl = await handleImage({
      imageUrl: image.link,
    });
    await postImage({
      imageUrl: image.processedUrl,
      title: process.env.DEFAULT_HASHTAGS || "",
    });
    const createdImage = await prisma.images.create({
      data: {
        mime: image.mime,
        rawUrl: image.link,
        url: image.processedUrl,
        title: image.title,
        status: "PUBLISHED",
      },
    });
    return createdImage;
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
