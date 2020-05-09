import React from 'react';

// API CONSTANTS
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE, SEARCH_BASE_URL, POPULAR_BASE_URL_MOVIES, TOP_RATED_BASE_URL_MOVIES } from '../config';

// Components
import HeroImage from '../components/elements/HeroImage';
import SearchBar from '../components/elements/SearchBar';
import Grid from '../components/elements/Grid';
import MovieThumb from '../components/elements/MovieThumb';
import LoadMoreButton from '../components/elements/LoadMoreButton';
import Spinner from '../components/elements/Spinner';

// Hooks
import { usePopularMoviesFetch } from '../hooks/usePopularMoviesFetch';
import { useTopRatedMoviesFetch } from '../hooks/useTopRatedMoviesFetch';

import NoImage from '../images/no_image.jpg';

const MoviesPage = () => {
   
    const [{ state: { movies, heroImage, currentPage, totalPages }, loading, error }, fetchPopularMovies ] = usePopularMoviesFetch();
    const [{ state: { topRatedMovies, heroImageTopRated, currentPageTopRated, totalPagesTopRated }, loadingTopRated, errorTopRated }, fetchTopRatedMovies ] = useTopRatedMoviesFetch();
    const [searchTerm, setSearchTerm] = React.useState('');
   
    if (!movies[0] || !topRatedMovies[0])  return <Spinner /> 
    if (error || errorTopRated) return <div>Something went wrong...</div>
    
    const loadMoreMovies = () => {
        const searchEndpoint = `${SEARCH_BASE_URL}${searchTerm}&page=${currentPage + 1}`;
        const popularEndpoint = `${POPULAR_BASE_URL_MOVIES}&page=${currentPage + 1}`;

        const endpoint = searchTerm ? searchEndpoint : popularEndpoint;
        fetchPopularMovies(endpoint);
    }
    const loadMoreTopRatedMovies = () => {
        const endpoint = `${TOP_RATED_BASE_URL_MOVIES}&page=${currentPageTopRated + 1}`;

        fetchTopRatedMovies(endpoint);
    }
    
    const searchMovies = search => {
        const endpoint = search ? SEARCH_BASE_URL + search : POPULAR_BASE_URL_MOVIES;
        setSearchTerm(search);
        fetchPopularMovies(endpoint);
    }

    const heroImageURL = `${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`;
    const heroImageTitle = heroImage.original_title;
    const heroImageText = heroImage.overview;

    return (
        <>
            {
                !searchTerm && (
                    <HeroImage 
                        image={heroImageURL}
                        title={heroImageTitle}
                        text={heroImageText}
                    />
                )
            }
            <SearchBar title="Seach Movies..." callback={searchMovies} />
            <Grid header={searchTerm ? searchTerm : 'Popular Movies'}>
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
            <hr style={{height: '50px', border: 'none', backgroundColor: '#333'}} />

            {
                !searchTerm && (
                    <Grid header={'Top Rated Movies'}>
                        {
                            topRatedMovies.map(movie => (
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
                )
            }
            { currentPageTopRated < totalPagesTopRated && !loadingTopRated && !searchTerm && 
                
                <LoadMoreButton text="Load More" callback={loadMoreTopRatedMovies} />
                
            }
            {
                loadingTopRated && <Spinner/>
            }
        </>
    )
}

export default MoviesPage;