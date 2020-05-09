import { useEffect, useCallback, useState } from 'react';
import { API_URL, API_KEY } from '../config';

import { useHistory } from 'react-router-dom';

export const useActorFetch = (actorId) => {
    const history = useHistory();

    const [state, setState] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const fetchData = useCallback(async () => {
        setError(false);
        setLoading(true);

        try {
            const endpoint = `${API_URL}person/${actorId}?api_key=${API_KEY}`;
            const response = await fetch(endpoint);
            if (response.status === 404) {
                history.goBack();
            }
            const result = await response.json();
            const knownforEndpoint = `${API_URL}person/${actorId}/movie_credits?api_key=${API_KEY}`;
            const knownForResults = await (await fetch(knownforEndpoint)).json();
            
            setState({
                ...result,
                roles: knownForResults.cast
            });
            
        } catch (error) {
            setError(true);
            console.error(error)
        }

        setLoading(false);
    }, [actorId])


    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return [state, loading, error];
}