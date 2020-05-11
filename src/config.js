// Configuration for TMDB
// To se the latest configuration fetch it from https://api.themoviedb.org/3/configuration?api_key=019e8f375549e0bbd4a4191862ebc88f
// Read more about the API here: https://developers.themoviedb.org/

const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'c9f3c719e4cce4a021ff37d2e89d43ba';
const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';

const SEARCH_BASE_URL = `${API_URL}search/movie?api_key=${API_KEY}&query=`;
const POPULAR_BASE_URL_MOVIES = `${API_URL}movie/popular?api_key=${API_KEY}`;
const TOP_RATED_BASE_URL_MOVIES = `${API_URL}movie/top_rated?api_key=${API_KEY}`;

const SEARCH_BASE_URL_SHOWS = `${API_URL}search/tv?api_key=${API_KEY}&query=`;
const TOP_RATED_BASE_URL_SHOWS = `${API_URL}tv/top_rated?api_key=${API_KEY}`;
const POPULAR_BASE_URL_SHOWS = `${API_URL}tv/popular?api_key=${API_KEY}`;


// Sizes: w300, w780, w1280, original
const BACKDROP_SIZE = 'w1280';
// w92, w154, w185, w342, w500, w780, original
const POSTER_SIZE = 'w500';

const LOGO_SIZE = 'w92';

export { API_URL, API_KEY, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE, LOGO_SIZE, SEARCH_BASE_URL, SEARCH_BASE_URL_SHOWS, TOP_RATED_BASE_URL_SHOWS, POPULAR_BASE_URL_MOVIES, TOP_RATED_BASE_URL_MOVIES, POPULAR_BASE_URL_SHOWS };
