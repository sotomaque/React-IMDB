import { useState, useEffect } from 'react';
import { API_URL, API_KEY } from '../config';

export const useRecommendedMoviesFetch = (movie_id) => {
    const [state, setState] = useState({ recommendedMovies: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  
    const fetchRecommendedMovies = async (endpoint) => {
      setError(false);
      setLoading(true);
      
      const isLoadMore = endpoint.search('page');
  
      try {
        const movieResult = await (await fetch(endpoint)).json();

        setState(prev => ({
          ...prev,
          recommendedMovies:
            isLoadMore !== -1
              ? [...prev.recommendedMovies, ...movieResult.results]
              : [...movieResult.results],
          currentPageRec: movieResult.page,
          totalPagesRec: movieResult.total_pages,
        }));

      } catch (error) {
        setError(true);
        console.error(error);
      }
      setLoading(false);
    };

    useEffect(() => {
        fetchRecommendedMovies(`${API_URL}movie/${movie_id}/recommendations?api_key=${API_KEY}`)
    }, [movie_id]);

    return [{ state, loading, error }, fetchRecommendedMovies]
}