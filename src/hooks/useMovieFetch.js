import { useEffect, useCallback, useState } from 'react';
import { API_URL, API_KEY } from '../config';

import { useHistory } from 'react-router-dom';

export const useMovieFetch = (movieId) => {

    const history = useHistory();

    const [state, setState] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const fetchData = useCallback(async () => {
        setError(false);
        setLoading(true);

        try {
            const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
            const response = await fetch(endpoint)
            if (response.status === 404) {
                history.goBack();
            }
            const moviesResult = await response.json();
            const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
            const creditsResult = await (await fetch(creditsEndpoint)).json();
            const directors = creditsResult.crew.filter(
                member => member.job === 'Director'
            );

            console.log('directors: ', directors)
            
            setState({
                ...moviesResult,
                actors: creditsResult.cast,
                directors,
                crew: creditsResult.crew
            });
            
        } catch (error) {
            setError(true);
            console.error(error)
        }

        setLoading(false);
    }, [movieId, history])


    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return [state, loading, error];
}