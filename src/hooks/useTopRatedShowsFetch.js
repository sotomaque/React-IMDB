import { useState, useEffect } from 'react';
import { API_URL, API_KEY } from '../config';

export const useTopRatedShowsFetch = searchTerm => {
    const [state, setState] = useState({ topRatedShows: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  
    const fetchTopRatedShows = async endpoint => {
      setError(false);
      setLoading(true);
  
      const isLoadMore = endpoint.search('page');
  
      try {
        const showsResult = await (await fetch(endpoint)).json();

        setState(prev => ({
          ...prev,
          topRatedShows:
            isLoadMore !== -1
              ? [...prev.topRatedShows, ...showsResult.results]
              : [...showsResult.results],
          heroImageTopRated: prev.heroImageTopRated || showsResult.results[0],
          currentPageTopRated: showsResult.page,
          totalPagesTopRated: showsResult.total_pages,
        }));

      } catch (error) {
        setError(true);
        console.error(error);
      }
      setLoading(false);
    };


    useEffect(() => {
        fetchTopRatedShows(`${API_URL}tv/top_rated?api_key=${API_KEY}`)
    }, []);

    return [{ state, loading, error }, fetchTopRatedShows]
}