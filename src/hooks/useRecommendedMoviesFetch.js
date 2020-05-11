import { useState, useEffect, useCallback } from 'react';
import { API_URL, API_KEY } from '../config';

export const useRecommendedMoviesFetch = (movie_id) => {
    const [state, setState] = useState({ simliarMovies: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  
    const fetchRecommendedMovies = useCallback(async (movieId) => {
      setError(false);
      setLoading(true);
      
      const endpoint = `${API_URL}movie/${movie_id}/recommendations?api_key=${API_KEY}`;
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
    }, [movie_id]);


    useEffect(() => {
        fetchRecommendedMovies(`${API_URL}movie/${movie_id}/recommendations?api_key=${API_KEY}`)
    }, [fetchRecommendedMovies, movie_id]);

    console.log(state)

    return [{ state, loading, error }, fetchRecommendedMovies]
}