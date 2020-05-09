import { useState, useEffect } from 'react';
import { API_URL, API_KEY } from '../config';

export const useSimilarMoviesFetch = (movie_id) => {
    const [state, setState] = useState({ simliarMovies: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  
    const fetchSimilarMovies = async (movieId) => {
      setError(false);
      setLoading(true);
      
      const endpoint = `${API_URL}movie/${movie_id}/similar?api_key=${API_KEY}`;
      const isLoadMore = endpoint.search('page');
  
      try {
        const movieResult = await (await fetch(endpoint)).json();

        setState(prev => ({
          ...prev,
          simliarMovies:
            isLoadMore !== -1
              ? [...prev.simliarMovies, ...movieResult.results]
              : [...movieResult.results],
          currentPageSimilar: movieResult.page,
          totalPagesSimilar: movieResult.total_pages,
        }));

      } catch (error) {
        setError(true);
        console.error(error);
      }
      setLoading(false);
    };

    


    useEffect(() => {
        fetchSimilarMovies(`${API_URL}movie/${movie_id}/similar?api_key=${API_KEY}`)
    }, []);

    return [{ state, loading, error }, fetchSimilarMovies]
}