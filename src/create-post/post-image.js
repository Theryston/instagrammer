import axios from "axios";

export async function postImage({ imageUrl, title = "" }) {
  if (!process.env.INSTAGRAM_TOKEN) {
    throw new Error("INSTAGRAM_TOKEN is not set at .env");
  }

  console.log(`Posting image ${imageUrl} to Instagram`);

  const { data: facebookUser } = await axios.get(
    `https://graph.facebook.com/v15.0/me/accounts`,
    {
      params: {
        access_token: process.env.INSTAGRAM_TOKEN,
      },
    }
  );

  const { data: instagramUser } = await axios.get(
    `https://graph.facebook.com/v15.0/${facebookUser.data[0].id}`,
    {
      params: {
        access_token: process.env.INSTAGRAM_TOKEN,
        fields: "instagram_business_account",
      },
    }
  );

  const igAccountId = instagramUser.instagram_business_account.id;

  const { data: container } = await axios.post(
    `https://graph.facebook.com/v15.0/${igAccountId}/media`,
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
    `https://graph.facebook.com/v15.0/${igAccountId}/media_publish`,
    {},
    {
      params: {
        creation_id: container.id,
        access_token: process.env.INSTAGRAM_TOKEN,
      },
    }
  );

  return publish;
}
