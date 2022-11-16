import axios from "axios";

export async function postImage({ imageUrl, title = "" }) {
  if (!process.env.INSTAGRAM_TOKEN) {
    throw new Error("INSTAGRAM_TOKEN is not set at .env");
  }

  console.log(`Posting image ${imageUrl} to Instagram`);

  const { data: container } = await axios.post(
    `https://graph.facebook.com/v15.0/${process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID}/media`,
    {},
    {
      params: {
        image_url: imageUrl,
        caption: title,
        access_token: process.env.INSTAGRAM_TOKEN,
      },
    }
  );

  const { data: publish } = await axios.post(
    `https://graph.facebook.com/v15.0/${process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID}/media_publish`,
    {},
    {
      params: {
        creation_id: container.id,
        access_token: process.env.INSTAGRAM_TOKEN,
      },
    }
  );

  const { data: post } = await axios.get(
    `https://graph.facebook.com/v15.0/${publish.id}`,
    {
      params: {
        access_token: process.env.INSTAGRAM_TOKEN,
        fields: "id,permalink",
      },
    }
  );

  return {
    id: post.id,
    permalink: post.permalink,
  };
}
