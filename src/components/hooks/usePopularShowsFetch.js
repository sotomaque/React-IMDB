import { useState, useEffect } from 'react';
import { API_URL, API_KEY } from '../../config';

export const usePopularShowsFetch = searchTerm => {
    const [state, setState] = useState({ shows: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  
    const fetchPopularShows = async endpoint => {
      setError(false);
      setLoading(true);
  
      const isLoadMore = endpoint.search('page');
  
      try {
        const showsResult = await (await fetch(endpoint)).json();

        setState(prev => ({
          ...prev,
          shows:
            isLoadMore !== -1
              ? [...prev.shows, ...showsResult.results]
              : [...showsResult.results],
          heroImageShow: prev.heroImageShow || showsResult.results[0],
          currentPage: showsResult.page,
          totalPages: showsResult.total_pages,
        }));

      } catch (error) {
        setError(true);
        console.error(error);
      }
      setLoading(false);
    };

    console.log('shows state', state)

    useEffect(() => {
        fetchPopularShows(`${API_URL}tv/popular?api_key=${API_KEY}`)
    }, []);

    return [{ state, loading, error }, fetchPopularShows]
}