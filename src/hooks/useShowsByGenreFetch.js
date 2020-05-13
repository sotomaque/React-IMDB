import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { API_URL, API_KEY } from '../config';

export const useShowsByGenreFetch = (genreId) => {
    const [state, setState] = useState({ shows: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const history = useHistory();

    const fetchShowsByGenre = async endpoint => {
        setError(false);
        setLoading(true);

        const isLoadMore = endpoint.search('page');

        try {
          const showResult = await (await fetch(endpoint)).json();
          if (showResult.results.length === 0) {
              history.goBack();
          }
          const randomIndex = Math.floor(Math.random() * 20)
          setState(prev => ({
            ...prev,
            shows:
              isLoadMore !== -1
                ? [...prev.shows, ...showResult.results]
                : [...showResult.results],
            heroImage: prev.heroImage || showResult.results[randomIndex],
            currentPage: showResult.page,
            totalPages: showResult.total_pages,
          }));
  
        } catch (error) {
          setError(true);
          console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchShowsByGenre(`${API_URL}discover/tv?api_key=${API_KEY}&with_genres=${genreId}`)
    }, [genreId]);

    return [{ state, loading, error }, fetchShowsByGenre]
}