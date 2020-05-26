import { useState, useEffect } from 'react';
import { API_URL, API_KEY } from '../config';

import { useHistory } from 'react-router-dom';

export const useHomeFetch = searchTerm => {
    const history = useHistory();
    
    const [state, setState] = useState({ movies: [], shows: [] });
    const [shows, setShows] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  
    const fetchMovies = async endpoint => {
      setError(false);
      setLoading(true);
  
      const isLoadMore = endpoint.search('page');
  
      try {
        const movieEndpoint = `${API_URL}movie/popular?api_key=${API_KEY}`;
        const showEndpoint = `${API_URL}tv/popular?api_key=${API_KEY}`;
        const movieResponse = await fetch(movieEndpoint);
        if (movieResponse.status === 404) {
          history.push('/404');
        }
        const movieResult = await movieResponse.json();

        const showResponse = await fetch(showEndpoint);
        if (showResponse.status === 404) {
          history.push('/404');
        }
        const showResult = await showResponse.json();

        setState(prev => ({
          ...prev,
          movies:
            isLoadMore !== -1
              ? [...prev.movies, ...movieResult.results]
              : [...movieResult.results],
          shows: 
            [...showResult.results],
          heroImage: prev.heroImage || movieResult.results[0],
          currentPage: movieResult.page,
          totalPages: movieResult.total_pages,
        }));

      } catch (error) {
        setError(true);
        console.error(error);
      }
      setLoading(false);
    };


    useEffect(() => {
        fetchMovies(`${API_URL}movie/popular?api_key=${API_KEY}`)
    }, []);

    return [{ state, loading, error }, fetchMovies]
}