
const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = process.env.API_KEY;

const SEARCH_BASE_URL = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=`;
const POPULAR_BASE_URL = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US`
const POPULAR_TV_URL = `${API_URL}discover/tv?api_key=${API_KEY}&language=en-US`
const CREDIT_URL = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`