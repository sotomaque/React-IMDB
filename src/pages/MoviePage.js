import React from 'react';
import { useParams } from "react-router-dom";
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
import NoImage from '../images/no_image.jpg';

// Components
import NavigationMovie from '../components/elements/NavigationMovie';
import MovieInfo from '../components/elements/MovieInfo'
import MovieInfoBar from '../components/elements/MovieInfoBar'
import Actor from '../components/elements/Actor'

import Grid from '../components/elements/Grid';
import Spinner from '../components/elements/Spinner';

// Hooks
import { useMovieFetch } from '../hooks/useMovieFetch';
import { useSimilarMoviesFetch } from '../hooks/useSimilarMoviesFetch';
import MovieThumb from '../components/elements/MovieThumb';

const MoviePage = () => {

    let { movieId } = useParams();
    const [movie, loading, error] = useMovieFetch(movieId);
    const [{ state: {simliarMovies}, loadingSimilar, errorSimilar}] = useSimilarMoviesFetch(movieId);

    console.log(simliarMovies)
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
            <hr style={{height: '50px', border: 'none', backgroundColor: '#333'}} />
            <Grid header="Similar Movies">
                {
                    simliarMovies.map((movie, index) => (
                        (movie.id != movieId) && index < 20 && 
                            <MovieThumb 
                                key={movie.id} 
                                clickable 
                                image={movie.poster_path 
                                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                                    : NoImage} 
                                movieId={movie.id}
                                movieName={movie.original_title}
                        />
                    ))
                }
            </Grid>
        </>
    )
}

export default MoviePage;