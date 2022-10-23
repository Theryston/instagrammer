import { getImage } from "./get-image.js";
import { postImage } from "./post-image.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createPost() {
  let image;
  try {
    image = await getImage();
    await postImage({
      imagePath: image.path,
      title: `${image.title}\n#inteligenciaartificial #provedor #programadora #programador #engenhariadesoftware #cienciadacomputacao #computacao #desenvolvedor #tecnologiadainformação #programação #programacao #tirinhasss`,
    });
    const createdImage = await prisma.images.create({
      data: {
        mime: image.mime,
        url: image.link,
        title: image.title,
        status: "PUBLISHED",
      },
    });
    return createdImage;
  } catch (e) {
    await prisma.images.create({
      data: {
        mime: image.mime,
        url: image.link,
        title: image.title,
        status: "ERROR",
      },
    });
    throw e;
  }
}
