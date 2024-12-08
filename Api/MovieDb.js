import axios from 'axios';
import {apikeys} from '../constant/Values';

// Endpoints

const apiBaseUrl = 'https://api.themoviedb.org/3';
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apikeys}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apikeys}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/similar?api_key=${apikeys}`;




// Dynamic endPonits

const movieDetailEndPonits = id =>
  `${apiBaseUrl}/movie/${id}?api_key=${apikeys}`;
const movieCreditsEndpoints = id =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${apikeys}`;
const similarMoviesEndpoints = id =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${apikeys}`;

// serch Movies
const searchMoviesENdPoint =
  `${apiBaseUrl}/search/movie?api_key=${apikeys}`;

// Person
const personDetilsEndPoint = id =>
  `${apiBaseUrl}/person/${id}?api_key=${apikeys}`;

const personMoviesEndPoints = id =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apikeys}`;

export const imge500 = path =>
  path ? `https://image.tmdb.org/t/p/w500/${path}` : null;
export const imge342 = path =>
  path ? `https://image.tmdb.org/t/p/w342/${path}` : null;
export const imge185 = path =>
  path ? `https://image.tmdb.org/t/p/w185/${path}` : null;

export const fallbackMoviePoster =
  'https://image.tmdb.org/t/p/w500/9Hk9qdCyce04VXNQuDXAK1d138E.jpg';
export const fallbackPersonImge =
  'https://image.tmdb.org/t/p/w500/qnqGbB22YJ7dSs4o6M7exTpNxPz.jpg';

  export const defaultBirthday='1993'

const apiCall = async (endpoints, params) => {
  const options = {
    method: 'Get',
    url: endpoints,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log('error', error);
    return {};
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndpoint);
};
export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndpoint);
};
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint);
};

export const fetchMovieDetails = id => {
  return apiCall(movieDetailEndPonits(id));
};

export const fetchMovieCredits = id => {
  return apiCall(movieCreditsEndpoints(id));
};

export const fetchSimilarDetails = id => {
  return apiCall(similarMoviesEndpoints(id));
};

// Person
export const fetchPersonDeatils = id => {
  return apiCall(personDetilsEndPoint(id));
};

export const fetchPersonMovies = id => {
  return apiCall(personMoviesEndPoints(id));
};

export const serchMovies=params=>{
  return apiCall(searchMoviesENdPoint,params)
}

