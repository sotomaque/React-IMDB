import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { API_URL, API_KEY } from '../config';

export const useMovieByGenreFetch = (genreId) => {
    const [state, setState] = useState({ movies: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const history = useHistory();

    const fetchMoviesByGenre = async endpoint => {
        setError(false);
        setLoading(true);
    
        const isLoadMore = endpoint.search('page');
    
        try {
          const movieResult = await (await fetch(endpoint)).json();
          if (movieResult.results.length === 0) {
            history.goBack();
          }
          const randomIndex = Math.floor(Math.random() * 20)
          setState(prev => ({
            ...prev,
            movies:
              isLoadMore !== -1
                ? [...prev.movies, ...movieResult.results]
                : [...movieResult.results],
            heroImage: prev.heroImage || movieResult.results[randomIndex],
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
        fetchMoviesByGenre(`${API_URL}discover/movie?api_key=${API_KEY}&with_genres=${genreId}`)
    }, [genreId]);

    return [{ state, loading, error }, fetchMoviesByGenre]
}