import { useState, useEffect } from 'react';
import { API_URL, API_KEY } from '../../config';

export const useHomeFetch = searchTerm => {
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
        const movieResult = await (await fetch(movieEndpoint)).json();
        const showResult = await (await fetch(showEndpoint)).json();

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