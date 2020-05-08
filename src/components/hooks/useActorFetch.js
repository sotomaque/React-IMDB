import { useEffect, useCallback, useState } from 'react';
import { API_URL, API_KEY } from '../../config';

export const useActorFetch = (actorId) => {
    const [state, setState] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const fetchData = useCallback(async () => {
        setError(false);
        setLoading(true);

        try {
            const endpoint = `${API_URL}person/${actorId}?api_key=${API_KEY}`;
            const result = await (await fetch(endpoint)).json();
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