import { searchImage } from "../services/google-images.js";
import { PrismaClient } from "@prisma/client";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs";
import https from "https";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

      page++;
    }
  }

  const path = await downloadImage(image);

  return {
    ...image,
    path,
  };
}

function downloadImage(image) {
  return new Promise((resolve) => {
    const absolutePath = path.join(
      __dirname,
      "..",
      "..",
      "images",
      `${Date.now()}.jpg`
    );
    if (!fs.existsSync(path.join(__dirname, "..", "..", "images"))) {
      fs.mkdirSync(path.join(__dirname, "..", "..", "images"));
    }
    const file = fs.createWriteStream(absolutePath);
    https.get(image.link, function (response) {
      response.pipe(file);
      file.on("finish", function () {
        file.close();
        resolve(absolutePath);
      });
    });
  });
}
