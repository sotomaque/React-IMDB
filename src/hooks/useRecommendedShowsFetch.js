import { useState, useEffect } from 'react';
import { API_URL, API_KEY } from '../config';

export const useRecommendedShowsFetch = (show_id) => {
    const [state, setState] = useState({ recommendedShows: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  
    const fetchRecommendedShows = async (endpoint) => {
      setError(false);
      setLoading(true);
    
      const isLoadMore = endpoint.search('page');
  
      try {
        const showResults = await (await fetch(endpoint)).json();

        setState(prev => ({
            ...prev,
            recommendedShows:
              isLoadMore !== -1
                ? [...prev.recommendedShows, ...showResults.results]
                : [...showResults.results],
            currentPageRec: showResults.page,
            totalPagesRec: showResults.total_pages,
          }));

      } catch (error) {
        setError(true);
        console.error(error);
      }
      setLoading(false);
    };

    useEffect(() => {
        fetchRecommendedShows(`${API_URL}tv/${show_id}/recommendations?api_key=${API_KEY}`)
    }, [show_id]);

    return [{ state, loading, error }, fetchRecommendedShows]
}