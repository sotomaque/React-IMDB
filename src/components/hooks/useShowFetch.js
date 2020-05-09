import { useEffect, useCallback, useState } from 'react';
import { API_URL, API_KEY } from '../../config';

export const useShowFetch = (showId) => {
    const [state, setState] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const fetchData = useCallback(async () => {
        setError(false);
        setLoading(true);

        try {
            const endpoint = `${API_URL}tv/${showId}?api_key=${API_KEY}`;
            const showResults = await (await fetch(endpoint)).json();

            const creditsEndpoint = `${API_URL}tv/${showId}/credits?api_key=${API_KEY}`;
            const creditsResult = await (await fetch(creditsEndpoint)).json();
            
            setState({
                ...showResults,
                actors: creditsResult.cast
            });
            
        } catch (error) {
            setError(true);
            console.error(error)
        }

        setLoading(false);
    }, [showId])


    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return [state, loading, error];
}