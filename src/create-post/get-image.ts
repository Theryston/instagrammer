import { searchImage } from "../services/google-images";
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
      console.log(`Checking image: ${images[i].link}`);
      const imageAlreadyExists = await prisma.images.findFirst({
        where: {
          rawUrl: images[i].link,
        },
      });

      if (!imageAlreadyExists) {
        image = images[i];
        console.log(`Found image: ${image.link}`);
        break;
      }
    }
    page++;
  }

  return image;
}
