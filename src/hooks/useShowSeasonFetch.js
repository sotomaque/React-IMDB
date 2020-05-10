import { useEffect, useCallback, useState } from 'react';
import { API_URL, API_KEY } from '../config';

export const useShowSeasonFetch = (showId, seasonNumber) => {
    const [state, setState] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const fetchData = useCallback(async () => {
        setError(false);
        setLoading(true);

        try {
            const endpoint = `${API_URL}tv/${showId}/season/${seasonNumber}?api_key=${API_KEY}`;
            const seasonResults = await (await fetch(endpoint)).json();
            
            setState({
                ...seasonResults,
                episodes: seasonResults.episodes
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