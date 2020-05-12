import { useState, useEffect } from 'react';
import { API_URL, API_KEY } from '../config';

export const useSimilarShowsFetch = (show_id) => {
    const [state, setState] = useState({ similarShows: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  
    const fetchSimilarShows = async (endpoint) => {
      setError(false);
      setLoading(true);
      
      const isLoadMore = endpoint.search('page');
  
      try {
        const showResults = await (await fetch(endpoint)).json();

        setState(prev => ({
          ...prev,
          similarShows:
            isLoadMore !== -1
              ? [...prev.similarShows, ...showResults.results]
              : [...showResults.results],
          currentPageSimilar: showResults.page,
          totalPagesSimilar: showResults.total_pages,
        }));

      } catch (error) {
        setError(true);
        console.error(error);
      }
      setLoading(false);
    };

    useEffect(() => {
        fetchSimilarShows(`${API_URL}tv/${show_id}/similar?api_key=${API_KEY}`)
    }, [show_id]);

    return [{ state, loading, error }, fetchSimilarShows]
}