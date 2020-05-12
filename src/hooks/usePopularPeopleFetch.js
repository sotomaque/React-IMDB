import { useState, useEffect } from 'react';
import { API_URL, API_KEY } from '../config';

export const usePopularPeopleFetch = () => {
    const [state, setState] = useState({ people: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchPopularPeople = async endpoint => {
        setError(false);
        setLoading(true);
  
        const isLoadMore = endpoint.search('page');

        try {
            const peopleResult = await (await fetch(endpoint)).json();
            setState(prev => ({
              ...prev,
              people:
                isLoadMore !== -1
                  ? [...prev.people, ...peopleResult.results]
                  : [...peopleResult.results],
              currentPage: peopleResult.page,
              totalPages: peopleResult.total_pages,
            }));
    
          } catch (error) {
            setError(true);
            console.error(error);
          }
          setLoading(false);
    };

    useEffect(() => {
        fetchPopularPeople(`${API_URL}person/popular?api_key=${API_KEY}`)
    }, []);

    return [{ state, loading, error }, fetchPopularPeople]
}