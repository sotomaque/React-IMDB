import React from 'react';
import { useParams } from "react-router-dom";
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
import NoImage from '../images/no_image.jpg';

// Components
import NavigationMovie from '../components/Navigation/NavigationMovie';

import MovieInfo from '../components/Movie/MovieInfo'
import MovieInfoBar from '../components/Movie/MovieInfoBar'
import MovieThumb from '../components/Movie/MovieThumb';

import Actor from '../components/People/Actor'
import CrewMember from '../components/People/CrewMember'

import Grid from '../components/elements/Grid';
import Spinner from '../components/elements/Spinner';

// Hooks
import { useMovieFetch } from '../hooks/useMovieFetch';
import { useSimilarMoviesFetch } from '../hooks/useSimilarMoviesFetch';
import { useRecommendedMoviesFetch } from '../hooks/useRecommendedMoviesFetch';

const MoviePage = () => {

    let { movieId } = useParams();
    const [movie, loading, error] = useMovieFetch(movieId);
    const [{ state: {simliarMovies}, loadingSimilar, errorSimilar}] = useSimilarMoviesFetch(movieId);
    const [{ state: {recommendedMovies}, loadingRec, errorRec}] = useRecommendedMoviesFetch(movieId);

    // if (!recommendedMovies[0] || !simliarMovies[0] || !movie[0]) return <Spinner/>;

    if (error || errorSimilar || errorRec) return <div>Something went wrong...</div>;
    if (loading || loadingSimilar || loadingRec) return <Spinner/> ;

    return (
        <div style={{paddingTop: '60px'}}>
            <NavigationMovie title={movie.title} />
            <MovieInfo movie={movie} />
            <MovieInfoBar time={movie.runtime} homepage={movie.homepage} budget={movie.budget} revenue={movie.revenue}/>
            {/** CAST **/}
            <Grid header="Cast">
                {
                    movie.actors.map((actor, index) => (
                        index < 5 &&
                            <Actor key={actor.credit_id} actor={actor} clickable />
                    ))
                }
            </Grid>
            {/** CREW **/}
            <hr style={{height: '50px', border: 'none', backgroundColor: '#333'}} />
            <Grid header="Crew">
                {
                    movie.crew.map((member, index) => (
                        index < 5 &&
                            <CrewMember key={member.credit_id} member={member} clickable />
                    ))
                }
            </Grid>
            {/** RECOMMENDED MOVIES **/}
            <hr style={{height: '50px', border: 'none', backgroundColor: '#333'}} />
            <Grid header="Recommended Movies">
                {
                    recommendedMovies.map((movie, index) => (
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
            {/** SIMILAR MOVIES **/}
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
            <hr style={{height: '50px', border: 'none', backgroundColor: '#333', marginBottom: '0'}} />
        </div>
    )
}

export default MoviePage;