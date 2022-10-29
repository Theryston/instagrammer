import axios from "axios";
import FormData from "form-data";
import fs from "node:fs";

export async function uploadImage({ path }) {
  console.log(`Uploading image from: ${path}`);
  const formData = new FormData();
  formData.append("files[]", fs.createReadStream(path));
  const { data: { url } } = await axios.post("https://xhr-server.herokuapp.com/upload", formData, {
    headers: formData.getHeaders()
  });
  console.log(`Image uploaded to: ${url}`);
  return url;
}