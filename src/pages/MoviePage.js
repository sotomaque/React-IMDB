import React from 'react';
import { useParams } from "react-router-dom";
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
import NoImage from '../images/no_image.jpg';

// Components
import NavigationMovie from '../components/elements/NavigationMovie';
import MovieInfo from '../components/elements/MovieInfo'
import MovieInfoBar from '../components/elements/MovieInfoBar'
import Actor from '../components/elements/Actor'
import CrewMember from '../components/elements/CrewMember'

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
    if (error || errorSimilar) return <div>Something went wrong...</div>;
    if (loading || loadingSimilar) return <Spinner/> ;

    return (
        <div style={{paddingTop: '60px'}}>
            <NavigationMovie title={movie.original_title} />
            <MovieInfo movie={movie} />
            <MovieInfoBar time={movie.runtime} homepage={movie.homepage} budget={movie.budget} revenue={movie.revenue}/>
            <Grid header="Cast">
                {
                    movie.actors.map((actor, index) => (
                        index < 10 &&
                            <Actor key={actor.credit_id} actor={actor} clickable />
                    ))
                }
            </Grid>
            <hr style={{height: '50px', border: 'none', backgroundColor: '#333'}} />
            <Grid header="Crew">
                {
                    movie.crew.map((member, index) => (
                        index < 10 &&
                            <CrewMember key={member.credit_id} member={member} clickable />
                    ))
                }
            </Grid>
            <hr style={{height: '50px', border: 'none', backgroundColor: '#333'}} />
            <Grid header="Similar Movies">
                {
                    simliarMovies.map((movie, index) => (
                        (movie.id.toString !== movieId.toString) && index < 20 && 
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
            <hr style={{height: '50px', border: 'none', backgroundColor: '#333'}} />
        </div>
    )
}

export default MoviePage;