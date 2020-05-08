import React from 'react';

// API CONFIG
import { API_URL, API_KEY, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from '../config';

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

const Home = () => {
   
    const [{ state, loading, error }, fetchMovies ] = useHomeFetch();
    const [searchTerm, setSearchTerm] = React.useState('');

    console.log(state);

    if (!state.movies[0])  return <Spinner /> 

    if (error) return <div>Something went wrong...</div>
    
    const loadMoreMovies = () => {
        const searchEndPoint = `${API_URL}search/movie?api_key${API_KEY}&query=${searchTerm}&page=${state.currentPage + 1}`;
        const popularEndPoint = `${API_URL}movie/popular?api_key=${API_KEY}&page=${state.currentPage + 1}`;

        const endpoint = searchTerm ? searchEndPoint : popularEndPoint;

        fetchMovies(endpoint)
    }

    return (
        <>
            <HeroImage 
                image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.heroImage.backdrop_path}`}
                title={state.heroImage.original_title}
                text={state.heroImage.overview}
            />
            <SearchBar />
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
            <LoadMoreButton text="Load More" callback={loadMoreMovies} />
        </>
    )
}

export default Home;