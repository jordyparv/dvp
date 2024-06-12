import axios from "axios";

const BASE_URL = `https://api.pexels.com/videos/`;
const PIXELS_KEY = "NFky2TdtbW4depwNkZyHxgqwOthITC6hrX9wdxAEQm26qCLRsHKzzacj";

const pixelApi = axios.create({
  baseUrl: `https://api.pexels.com/videos/`,
  headers: {
    Authorization: PIXELS_KEY,
  },
});

export const getVideos = async (query) => {
  try {
    const response = await pixelApi.get("search", {
      params: {
        query,
      },
    });
    console.log(response, "______")
    return response.data;
  } catch (error) {
    console.log(error, "Error getting data");
    throw error;
  }
};
