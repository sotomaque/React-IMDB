import { useState, useEffect } from 'react';
import { API_URL, API_KEY } from '../config';

export const useTopRatedMoviesFetch = searchTerm => {
    const [state, setState] = useState({ topRatedMovies: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  
    const fetchTopRatedMovies = async endpoint => {
      setError(false);
      setLoading(true);
  
      const isLoadMore = endpoint.search('page');
  
      try {
        const movieResult = await (await fetch(endpoint)).json();

        setState(prev => ({
          ...prev,
          topRatedMovies:
            isLoadMore !== -1
              ? [...prev.topRatedMovies, ...movieResult.results]
              : [...movieResult.results],
          heroImageTopRated: prev.heroImageTopRated || movieResult.results[0],
          currentPageTopRated: movieResult.page,
          totalPagesTopRated: movieResult.total_pages,
        }));

      } catch (error) {
        setError(true);
        console.error(error);
      }
      setLoading(false);
    };


    useEffect(() => {
        fetchTopRatedMovies(`${API_URL}movie/top_rated?api_key=${API_KEY}`)
    }, []);

    return [{ state, loading, error }, fetchTopRatedMovies]
}