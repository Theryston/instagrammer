import { searchImage } from "../services/google-images.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getImage() {
  let image;
  let page = 1;

  while (!image) {
    const { data: imagesResult } = await searchImage({
      term: process.env.INSTAGRAM_ABOUT,
      page,
    });
    const images = imagesResult.items;

    if (!images || !images.length) {
      throw new Error("No images found");
    }

    for (let i = 0; i < images.length; i++) {
      const imageAlreadyExists = await prisma.images.findFirst({
        where: {
          url: images[i].link,
        },
      });

      if (!imageAlreadyExists) {
        image = images[i];
        break;
      }
    }
    page++;
  }

  return image;
}
