import { getImage } from "./get-image.js";
import { postImage } from "./post-image.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createPost() {
  let image;
  try {
    image = await getImage();
    await postImage({
      imageUrl: image.link,
      title: process.env.DEFAULT_HASHTAGS || "",
    });
    const createdImage = await prisma.images.create({
      data: {
        mime: image.mime,
        rawUrl: image.link,
        url: image.link,
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
          url: image.link,
        },
      });
    }
    throw e;
  }
}
