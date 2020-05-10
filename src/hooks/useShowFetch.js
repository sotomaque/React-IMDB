import { useEffect, useCallback, useState } from 'react';
import { API_URL, API_KEY } from '../config';

import { useHistory } from 'react-router-dom';


export const useShowFetch = (showId) => {
    const history = useHistory();

    const [state, setState] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const fetchData = useCallback(async () => {
        setError(false);
        setLoading(true);

        try {
            const endpoint = `${API_URL}tv/${showId}?api_key=${API_KEY}`;
            const response = await fetch(endpoint);
            if (response.status === 404) {
                history.goBack();
            }
            const showResults = await response.json();

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
    }, [showId, history])


    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return [state, loading, error];
}