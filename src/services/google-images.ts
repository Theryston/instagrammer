import axios from "axios";

export async function searchImage({ term, page = 1 }) {
  if (!process.env.GOOGLE_API_KEY) {
    throw new Error("Please set the GOOGLE_API_KEY environment variable.");
  }

  if (!process.env.GOOGLE_SEARCH_ENGINE_ID) {
    throw new Error(
      "Please set the GOOGLE_SEARCH_ENGINE_ID environment variable."
    );
  }

  const response = await axios.get(
    "https://www.googleapis.com/customsearch/v1",
    {
      params: {
        q: term,
        searchType: "image",
        key: process.env.GOOGLE_API_KEY,
        cx: process.env.GOOGLE_SEARCH_ENGINE_ID,
        start: page,
        num: 10,
      },
    }
  );

  return response;
}
