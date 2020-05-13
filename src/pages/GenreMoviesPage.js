import React from 'react';
import { useParams } from "react-router-dom";
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../config';
import NoImage from '../images/no_image.jpg';

// Components
import MovieThumb from '../components/Movie/MovieThumb';
import LoadMoreButton from '../components/elements/LoadMoreButton';
import HeroImage from '../components/elements/HeroImage';
import Grid from '../components/elements/Grid';
import Spinner from '../components/elements/Spinner';

// Hooks
import { useMovieByGenreFetch } from '../hooks/useMovieByGenreFetch';


const GenreMoviesPage = () => {
    let { genreId, genreName } = useParams();
    const [{ state: { movies, heroImage, currentPage, totalPages }, loading, error }, fetchMoviesByGenre ] = useMovieByGenreFetch(genreId);

    if (!movies[0] || loading) return <Spinner/> ;
    if (error) return <div>Something went wrong...</div>;

    const loadMoreMovies = () => {
        fetchMoviesByGenre(`${API_URL}discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${currentPage + 1}`);
    }

    return (
        <div style={{paddingTop: '50px'}}>
            <HeroImage 
                image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
                title={heroImage.original_title}
                text={heroImage.overview}
            />
            <Grid header={`${genreName} Movies`}>
                {
                    movies.map(movie => (
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
            {
                loading && <Spinner/>
            }
            { currentPage < totalPages && !loading && 
                <LoadMoreButton text="Load More" callback={loadMoreMovies} />
            }
            <hr style={{height: '50px', border: 'none', backgroundColor: '#333', marginBottom: '0'}} />
        </div>
    )
}

export default GenreMoviesPage;