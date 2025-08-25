import axios from "axios";

// ======================= OMDb API ===========================
const apiBaseUrlOMDb = "https://www.omdbapi.com";
const apiKeyOMDb = "fb6a8287";

//  OMDb Common function
export const apiCallOMDb = async (params = {}) => {
  try {
    const response = await axios.get(apiBaseUrlOMDb, {
      params: {
        apikey: apiKeyOMDb,
        ...params,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching from OMDb API:",
      error?.response?.data || error.message
    );
    throw error;
  }
};

// OMDb Functions
export const fetchTrendingMoviesOMDb = (search = "Drama") =>
  apiCallOMDb({ s: search, type: "movie" });

export const fetchUpcomingMoviesOMDb = async () => {
  const nextYear = new Date().getFullYear() + 1;
  const res = await apiCallOMDb({ s: "movie", y: nextYear, type: "movie" });
  return res?.Search ? { ...res, Search: res.Search.reverse() } : res;
};

export const fetchTopRatedMoviesOMDb = () =>
  apiCallOMDb({ s: "top", type: "movie" });

export const fetchMovieDetailsOMDb = (imdbId) => {
  if (!imdbId) throw new Error("imdbId is required for fetchMovieDetails");
  return apiCallOMDb({ i: imdbId, plot: "full" });
};

export const fetchMovieCastOMDb = async (imdbId) => {
  if (!imdbId) throw new Error("imdbId is required for fetchMovieCast");
  const details = await fetchMovieDetailsOMDb(imdbId);
  return details?.Actors ? details.Actors.split(",") : [];
};

export const fetchMovieWriterOMDb = async (imdbId) => {
  if (!imdbId) throw new Error("imdbId is required for fetchMovieWriter");
  const details = await fetchMovieDetailsOMDb(imdbId);
  return details?.Writer ? details.Writer.split(",") : [];
};

export const searchMoviesOMDb = (query) => {
  if (!query) throw new Error("Search query is required");
  return apiCallOMDb({ s: query, type: "movie" });
};

// ======================= IMDb RapidAPI ===========================
const apiBaseUrl = "https://imdb236.p.rapidapi.com";
const apiKey = "2231af3baamsh9c0afdb0585fe4cp1b00eejsn260233fdab20";

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
      `Error fetching from rapidAPI ${endpoint}:`,
      error?.response?.data || error.message
    );
    throw error;
  }
};

// RapidAPI Functions
export const fetchTrendingMovies = () =>
  apiCall("/api/imdb/search", {
    type: "movie",
    genre: "Drama",
    rows: 25,
    sortOrder: "ASC",
    sortField: "id",
  });

export const fetchUpcomingMovies = () => apiCall("/api/imdb/india/upcoming");

export const fetchTopRatedMovies = () =>
  apiCall("/api/imdb/india/top-rated-indian-movies");

export const fetchMovieDetails = (imdbId) => {
  if (!imdbId) throw new Error("imdbId is required for fetchMovieDetails");
  console.log("Fetching movie details for:", imdbId,"--------",apiCall(`/api/imdb/${imdbId}`));
  return apiCall(`/api/imdb/${imdbId}`);
};

export const fetchMovieCast = (imdbId) => {
  if (!imdbId) throw new Error("imdbId is required for fetchMovieCast");
  return apiCall(`/api/imdb/${imdbId}/cast`);
};

export const fetchMovieWriter = (imdbId) => {
  if (!imdbId) throw new Error("imdbId is required for fetchMovieWriter");
  return apiCall(`/api/imdb/${imdbId}/writers`);
};

export const searchMovies = (query) => {
  if (!query) throw new Error("Search query is required");
  return apiCall("/api/imdb/autocomplete", {
    query: "movie",
    
  });
};

// ======================= Normalizer ==========/api/imdb/search?type=movie&genre=Drama&rows=25&sortOrder=ASC&sortField=id=================
// Normalize data (so UI me same format use ho sake)
export const normalizeMovies = (res) => {
  if (!res) return [];

  // OMDb → { Search: [...] }
  if (res.Search) {
    return res.Search.map((m) => ({
      imdbID: m.imdbID,
      title: m.Title,
      year: m.Year,
      poster: m.Poster !== "N/A" ? m.Poster : null,
      type: m.Type,
      source: "OMDb",
    }));
  }

  // RapidAPI → { results: [...] }
  if (res.results) {
    return res.results.map((m) => ({
      imdbID: m.id,
      title: m.primaryTitle,
      year: m.startYear,
      poster: m.primaryImage,
      type: "movie",
      source: "RapidAPI",
    }));
  }

  return Array.isArray(res) ? res : [];
};

export default {
  // OMDb
  fetchTrendingMoviesOMDb,
  fetchUpcomingMoviesOMDb,
  fetchTopRatedMoviesOMDb,
  fetchMovieDetailsOMDb,
  fetchMovieCastOMDb,
  fetchMovieWriterOMDb,
  searchMoviesOMDb,
  // RapidAPI
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieWriter,
  searchMovies,
  // Common
  normalizeMovies,
};
