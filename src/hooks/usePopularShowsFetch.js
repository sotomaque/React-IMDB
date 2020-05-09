import { useState, useEffect } from 'react';
import { API_URL, API_KEY } from '../config';

export const usePopularShowsFetch = searchTerm => {
    const [state, setState] = useState({ shows: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  
    const fetchPopularShows = async endpoint => {
      setError(false);
      setLoading(true);
  
      const isLoadMore = endpoint.search('page');
  
      try {
        const showResult = await (await fetch(endpoint)).json();

        setState(prev => ({
          ...prev,
          shows:
            isLoadMore !== -1
              ? [...prev.shows, ...showResult.results]
              : [...showResult.results],
          heroImageShow: prev.heroImageShow || showResult.results[0],
          currentPageShow: showResult.page,
          totalPagesShow: showResult.total_pages,
        }));

      } catch (error) {
        setError(true);
        console.error(error);
      }
      setLoading(false);
    };

    useEffect(() => {
        fetchPopularShows(`${API_URL}tv/popular?api_key=${API_KEY}`)
    }, []);

    return [{ state, loading, error }, fetchPopularShows]
}