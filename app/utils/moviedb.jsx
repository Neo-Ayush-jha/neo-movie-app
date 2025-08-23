import axios from "axios";
import { apiKey } from "../constants/index";
const apiBaseUrl = "https://imdb236.p.rapidapi.com";



export const getImageUrl = (item, size = "medium") => {
  if (item?.thumbnails && item.thumbnails.length > 0) {
    switch (size) {
      case "small":
        return item.thumbnails.find(t => t.width <= 100)?.url || item.thumbnails[0].url;
      case "medium":
        return item.thumbnails.find(t => t.width <= 280)?.url || item.thumbnails[0].url;
      case "large":
        return item.thumbnails.find(t => t.width <= 500)?.url || item.thumbnails[0].url;
      default:
        return item.primaryImage;
    }
  } 
  
  // agar thumbnails empty array ya undefined ho
  return item?.primaryImage || item?.url || "https://via.placeholder.com/150";
};

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "x-rapidapi-key": apiKey,
    "x-rapidapi-host": "imdb236.p.rapidapi.com",
    Accept: "application/json",
  },
});

export const apiCall = async (endpoint, params = {}) => {
  try {
    const response = await axiosInstance.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching from ${endpoint}:`,
      error?.response?.data || error.message
    );
    throw error;
  }
};

export const fetchTrendingMovies = () =>
  apiCall("/api/imdb/search", {
    type: "movie",
    genre: "Drama",
    rows: 25,
    sortOrder: "ASC",
    sortField: "id",
  });

export const fetchUpcomingMovies = () =>
  apiCall("/api/imdb/india/upcoming");

export const fetchTopRatedMovies = () =>
  apiCall("/api/imdb/india/top-rated-indian-movies");

export const fetchMovieDetails = (imdbId) => {
  if (!imdbId) {
    throw new Error("imdbId is required for fetchMovieDetails");
  }
  return apiCall(`/api/imdb/${imdbId}`);
};

export const fetchMovieCast = (imdbId) => {
  if (!imdbId) {
    throw new Error("imdbId is required for fetchMovieCast");
  }
  return apiCall(`/api/imdb/${imdbId}/cast`);
};
export const fetchMovieWriter = (imdbId) => {
  if (!imdbId) {
    throw new Error("imdbId is required for fetchMovieWriter");
  }
  return apiCall(`/api/imdb/${imdbId}/writers`);
};

export default {
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
  getImageUrl,
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieWriter,
};
