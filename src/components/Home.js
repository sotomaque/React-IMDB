import React from 'react';

// API CONFIG
import { API_URL, API_KEY } from '../config';

// Components
import HeroImage from './elements/HeroImage';
import SearchBar from './elements/SearchBar';
import Grid from './elements/Grid';
import MovieThumb from './elements/MovieThumb';
import LoadMoreButton from './elements/LoadMoreButton';
import Spinner from './elements/Spinner';

// Hooks
import { useHomeFetch } from './hooks/useHomeFetch';

const Home = () => {
   
    const [{ state, loading, error }, fetchMovies ] = useHomeFetch();
    console.log(state);
    
    return (
        <>
            <HeroImage />
            <SearchBar />
            <Grid />
            <MovieThumb />
            <LoadMoreButton />
            <Spinner />
        </>
    )
}

export default Home;