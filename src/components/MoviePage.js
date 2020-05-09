import React from 'react';
import { useParams } from "react-router-dom";
// Components
import NavigationMovie from './elements/NavigationMovie';
import MovieInfo from './elements/MovieInfo'
import MovieInfoBar from './elements/MovieInfoBar'
import Actor from './elements/Actor'

import Grid from './elements/Grid';
import Spinner from './elements/Spinner';

// Hooks
import { useMovieFetch } from './hooks/useMovieFetch';

const MoviePage = () => {

    let { movieId } = useParams();
    const [movie, loading, error] = useMovieFetch(movieId);

    if (error) return <div>Something went wrong...</div>;
    if (loading) return <Spinner/> ;

    return (
        <>
            <NavigationMovie title={movie.title} />
            <MovieInfo movie={movie} />
            <MovieInfoBar time={movie.runtime} homepage={movie.homepage} budget={movie.budget} revenue={movie.revenue}/>
            <Grid header="Actors">
                {
                    movie.actors.map((actor, index) => (
                        index < 10 &&
                            <Actor key={actor.credit_id} actor={actor} clickable />
                    ))
                }
            </Grid>
        </>
    )
}

export default MoviePage;