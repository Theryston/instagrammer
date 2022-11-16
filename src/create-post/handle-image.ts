import axios from "axios";
import { S3 } from "aws-sdk";
import sharp from "sharp";
import smartcrop from "smartcrop-sharp";

const s3 = new S3();

export async function handleImage(url: string): Promise<string> {
  console.log(`Downloading image: ${url}`);
  const response = await axios.get(url, {
    responseType: "arraybuffer",
  });
  const imageBytes = Buffer.from(response.data, "binary");
  console.log(`Downloaded image: ${imageBytes.length} bytes`);

  const croppedImage = await cropImage(imageBytes);

  const link = await uploadImage(croppedImage);

  return link;
}

async function uploadImage(image: Buffer): Promise<string> {
  if (!process.env.AWS_BUCKET_NAME) {
    throw new Error("AWS_BUCKET_NAME is not set");
  }

  console.log(`Uploading image: ${image.length} bytes`);

  const { Location } = await s3
    .upload({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${Date.now()}.jpg`,
      Body: image,
      ACL: "public-read",
      ContentType: "image/jpeg",
    })
    .promise();

  return Location;
}

async function getAspectRatio(imageBytes: Buffer): Promise<number> {
  const metadata = await sharp(imageBytes).metadata();
  return metadata.width / metadata.height;
}

async function cropImage(imageBytes: Buffer): Promise<Buffer> {
  const aspectRadio = await getAspectRatio(imageBytes);
  console.log(`Image aspect radio: ${aspectRadio}`);
  const width = 1080;
  let height = 0;

  if (aspectRadio < 0.8) {
    height = width / 0.8;
  } else if (aspectRadio > 1.7) {
    height = width / 1.7;
  } else {
    height = width / aspectRadio;
  }

  height = Math.round(height);

  console.log(`Cropping image to: ${width}x${height}`);

  const { topCrop: crop } = await smartcrop.crop(imageBytes, {
    width,
    height,
  });

  console.log(`Cropping image at position: ${crop.x}x ${crop.y}y`);

  return sharp(imageBytes)
    .extract({
      width: crop.width,
      height: crop.height,
      left: crop.x,
      top: crop.y,
    })
    .resize(width, height)
    .toFormat("jpeg", {
      progressive: true,
      quality: 100,
    })
    .toBuffer();
}
