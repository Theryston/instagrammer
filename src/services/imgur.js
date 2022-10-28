import axios from "axios";
import FormData from "form-data";
import fs from "node:fs";

export async function uploadImage({ path }) {
  const formData = new FormData();
  formData.append("image", fs.createReadStream(path));
  const {
    data: { data },
  } = await axios.post("https://api.imgur.com/3/image", formData, {
    headers: {
      'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
      ...formData.getHeaders()
    },
  });
  return data.link;
}