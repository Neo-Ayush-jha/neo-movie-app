import axios from "axios";

const apiBaseUrlOMDb = "https://www.omdbapi.com";
const apiKeyOMDb = "fb6a8287";

const apiBaseUrl = "https://imdb236.p.rapidapi.com";

// const apiKey = "0ce0e6feaemsh3dc7be47c0c37e7p105246jsn0cdbd5c92a51";
const apiKey = "79eef92ad3msh2574463fd0ea9b2p1e7024jsn6ef70d0a6bd1";
// const apiKey = "bf059c65e0msh5774b16b0638e3fp1d4c97jsn3d0679f9d11a";
// const apiKey = "8895af2febmsh60f0ec114d7b500p1d5b82jsnf06ae2fbbcc4";



// ✅ Common function for API call
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

// ✅ Trending = search by keyword (no real trending in OMDb)
export const fetchTrendingMoviesOMDb = (search = "Drama") =>
  apiCallOMDb({ s: search, type: "movie" });

// ✅ Upcoming (workaround → search by next year)
export const fetchUpcomingMoviesOMDb = async () => {
  const nextYear = new Date().getFullYear() + 1;
  const res = await apiCallOMDb({ s: "movie", y: nextYear, type: "movie" });
  if (res?.Search && Array.isArray(res.Search)) {
    res.Search = res.Search.reverse();
  }
  return res;
};

// ✅ Top rated (OMDb doesn’t have this — fake via search)
export const fetchTopRatedMoviesOMDb = () =>
  apiCallOMDb({ s: "top", type: "movie" });

// ✅ Details
export const fetchMovieDetailsOMDb = (imdbId) => {
  if (!imdbId) throw new Error("imdbId is required for fetchMovieDetails");
  return apiCallOMDb({ i: imdbId, plot: "full" });
};

// ✅ Cast (comes from details)
export const fetchMovieCastOMDb = async (imdbId) => {
  if (!imdbId) throw new Error("imdbId is required for fetchMovieCast");
  const details = await fetchMovieDetailsOMDb(imdbId);
  // console.log(details)
  return details || [];
};

// ✅ Writers (also from details)
export const fetchMovieWriterOMDb = async (imdbId) => {
  if (!imdbId) throw new Error("imdbId is required for fetchMovieWriter");
  const details = await fetchMovieDetailsOMDb(imdbId);
  return details || [];
};

// -------------------------------------------------------------------------

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
    // console.log("API Response:", response.data); 
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching from rapidAPI ${endpoint}:`,
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

export const fetchUpcomingMovies = () => apiCall("/api/imdb/india/upcoming");

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


// ✅ Normalize data from OMDb or RapidAPI
export const normalizeMovies = (res) => {
  if (!res) return [];

  // OMDb → { Search: [...] }
  if (res.Search) return res.Search;

  // RapidAPI → { results: [...] }
  if (res.results) return res.results;

  // Fallback
  return Array.isArray(res) ? res : [];
};

export default {
  fetchTrendingMoviesOMDb,
  fetchUpcomingMoviesOMDb,
  fetchTopRatedMoviesOMDb,
  fetchMovieDetailsOMDb,
  fetchMovieCastOMDb,
  fetchMovieWriterOMDb,
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieWriter,
  normalizeMovies,
};
