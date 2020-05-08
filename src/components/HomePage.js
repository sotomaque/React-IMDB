import React from 'react';

// API CONSTANTS
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE, SEARCH_BASE_URL, POPULAR_BASE_URL } from '../config';

// Components
import HeroImage from './elements/HeroImage';
import SearchBar from './elements/SearchBar';
import Grid from './elements/Grid';
import MovieThumb from './elements/MovieThumb';
import LoadMoreButton from './elements/LoadMoreButton';
import Spinner from './elements/Spinner';

// Hooks
import { useHomeFetch } from './hooks/useHomeFetch';

import NoImage from './images/no_image.jpg';

const HomePage = () => {
   
    const [{ state, loading, error }, fetchMovies ] = useHomeFetch();
    const [searchTerm, setSearchTerm] = React.useState('');

    console.log(state);

    if (!state.movies[0])  return <Spinner /> 

    if (error) return <div>Something went wrong...</div>
    
    const loadMoreMovies = () => {
        const searchEndpoint = `${SEARCH_BASE_URL}${searchTerm}&page=${state.currentPage + 1}`;
        const popularEndpoint = `${POPULAR_BASE_URL}&page=${state.currentPage + 1}`;

        const endpoint = searchTerm ? searchEndpoint : popularEndpoint;
        fetchMovies(endpoint);
    }

    const searchMovies = search => {
        const endpoint = search ? SEARCH_BASE_URL + search : POPULAR_BASE_URL;
        setSearchTerm(search);
        fetchMovies(endpoint);
      }

    return (
        <>
            {
                !searchTerm && (
                    <HeroImage 
                        image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.heroImage.backdrop_path}`}
                        title={state.heroImage.original_title}
                        text={state.heroImage.overview}
                    />
                )
            }
           
            <SearchBar callback={searchMovies} />
            <Grid header={searchTerm ? searchTerm : 'Popular Movies'}>
                {
                    state.movies.map(movie => (
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
            { state.currentPage < state.totalPages && !loading && (
                <LoadMoreButton text="Load More" callback={loadMoreMovies} />
            )}
        </>
    )
}

export default HomePage;