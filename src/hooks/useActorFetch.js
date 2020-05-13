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
            const knownforMoviesEndpoint = `${API_URL}person/${actorId}/movie_credits?api_key=${API_KEY}`;
            const knownForMoviesResults = await (await fetch(knownforMoviesEndpoint)).json();

            const knownForShowsEndpoint = `${API_URL}person/${actorId}/tv_credits?api_key=${API_KEY}`;
            const knownForShowsResults = await (await fetch(knownForShowsEndpoint)).json();

            setState({
                ...result,
                movies: knownForMoviesResults.cast,
                shows: knownForShowsResults.cast,
                moviesCrew: knownForMoviesResults.crew,
                showsCrew: knownForShowsResults.crew
            });
            
        } catch (error) {
            setError(true);
            console.error(error)
        }

        setLoading(false);
    }, [actorId, history])

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return [state, loading, error];
}