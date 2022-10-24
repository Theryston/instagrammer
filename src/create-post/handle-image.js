import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import download from "image-downloader";
import { execSync } from "child_process";
import mime from "mime-types";
import sharp from "sharp";
import { uploadImage } from "../services/imgur.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function handleImage({ imageUrl }) {
  const folderAbsolutePath = path.join(__dirname, "..", "..", "images");

  const rawImagePath = await downloadImage(imageUrl, folderAbsolutePath);

  if (!fs.existsSync(folderAbsolutePath)) {
    fs.mkdirSync(folderAbsolutePath);
  }

  const distFileAbsolutePath = path.join(
    folderAbsolutePath,
    `${Date.now()}.jpg`
  );

  await sharp(rawImagePath).jpeg().toFile(distFileAbsolutePath);

  fs.unlinkSync(rawImagePath);

  const { link } = await uploadImage({
    path: distFileAbsolutePath,
  });

  fs.unlinkSync(distFileAbsolutePath);

  return link;
}

async function downloadImage(url, folderAbsolutePath) {
  const { filename: inputImagePath } = await download.image({
    url: url,
    dest: folderAbsolutePath,
    extractFilename: true,
  });
  const mimeType = execSync(`file --mime-type -b ${inputImagePath}`)
    .toString()
    .trim();
  const extension = mime.extension(mimeType);

  const rawImagePath = `${inputImagePath}.${extension}`;

  fs.writeFileSync(rawImagePath, fs.readFileSync(inputImagePath));
  fs.unlinkSync(inputImagePath);

  return rawImagePath;
}
