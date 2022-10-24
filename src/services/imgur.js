import axios from "axios";
import FormData from "form-data";
import fs from "fs";

export async function uploadImage({ path }) {
  const formData = new FormData();
  formData.append("image", fs.createReadStream(path));
  const {
    data: { data },
  } = await axios.post("https://api.imgur.com/3/upload", formData, {
    headers: {
      ...formData.getHeaders(),
    },
  });
  return data;
}
