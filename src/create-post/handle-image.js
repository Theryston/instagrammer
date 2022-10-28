import { execSync } from "node:child_process";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import mime from "mime-types";
import download from "image-downloader";
import smartcrop from 'smartcrop-gm';
import Gm from 'gm';
import { uploadImage } from "../services/imgur.js";

const gm = Gm.subClass({ imageMagick: true })

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function handleImage(url) {
  const folderAbsolutePath = path.join(__dirname, "..", "..", "images");

  const rawImagePath = await downloadImage(url, folderAbsolutePath);

  const distFileAbsolutePath = path.join(
    folderAbsolutePath,
    `${Date.now()}.jpg`
  );

  await cropImage({ path: rawImagePath, distFileAbsolutePath });


  console.log(`Uploading image: ${distFileAbsolutePath}`);
  const link = await uploadImage({
    path: distFileAbsolutePath,
  });

  console.log(`Deleting images from disk`);
  fs.unlinkSync(rawImagePath);
  fs.unlinkSync(distFileAbsolutePath);

  return link;
}

async function cropImage({ path, distFileAbsolutePath }) {
  console.log(`Cropping image: ${path}`);
  const width = 1000;
  const height = 1000;

  const image = fs.readFileSync(path);

  const result = await smartcrop.crop(image, { width, height })
  const crop = result.topCrop;
  const promise = new Promise((resolve, reject) => {
    gm(image)
      .crop(crop.width, crop.height, crop.x, crop.y)
      .resize(width, height)
      .write(distFileAbsolutePath, function (error) {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
  });
  await promise;
}

async function downloadImage(url, folderAbsolutePath) {
  console.log(`Downloading image from: ${url}`);
  if (!fs.existsSync(folderAbsolutePath)) {
    fs.mkdirSync(folderAbsolutePath);
  }

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