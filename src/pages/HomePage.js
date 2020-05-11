import React from 'react';

// API CONSTANTS
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE, POPULAR_BASE_URL_MOVIES, POPULAR_BASE_URL_SHOWS } from '../config';

// Components
import MovieThumb from '../components/Movie/MovieThumb';
import HeroImage from '../components/elements/HeroImage';
import Grid from '../components/elements/Grid';
import LoadMoreButton from '../components/elements/LoadMoreButton';
import Spinner from '../components/elements/Spinner';

// Hooks
import { usePopularMoviesFetch } from '../hooks/usePopularMoviesFetch';
import { usePopularShowsFetch } from '../hooks/usePopularShowsFetch';

import NoImage from '../images/no_image.jpg';
import ShowThumb from '../components/TV/ShowThumb';

const HomePage = () => {
   
    const [{ state: { movies, heroImage, currentPage, totalPages }, loading, error }, fetchPopularMovies ] = usePopularMoviesFetch();
    const [{ state: { shows, heroImageShow, currentPageShow, totalPagesShow }, loadingShow, errorShow }, fetchPopularShows ] = usePopularShowsFetch();

    const randomIndex = Math.round(Math.random())
   
    if (!movies[0] || !shows[0])  return <Spinner /> 

    if (error || errorShow) return <div>Something went wrong...</div>
    
    const loadMoreMovies = () => {
        const popularEndpoint = `${POPULAR_BASE_URL_MOVIES}&page=${currentPage + 1}`;
        fetchPopularMovies(popularEndpoint);
    }

    const loadMoreShows = () => {
        const endpoint = `${POPULAR_BASE_URL_SHOWS}&page=${currentPage + 1}`;
        fetchPopularShows(endpoint);
    }

    const heroImageURL = randomIndex === 0 ? `${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}` : `${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImageShow.backdrop_path}`;
    const heroImageTitle = randomIndex === 0 ? heroImage.original_title: heroImageShow.original_name;
    const heroImageText = randomIndex === 0 ? heroImage.overview : heroImageShow.overview;

    return (
        <div style={{paddingTop: '60px'}}>
            
            <HeroImage 
                image={heroImageURL}
                title={heroImageTitle}
                text={heroImageText}
            />
              
           
            <Grid header='Popular Movies'>
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
            { currentPage < totalPages && !loading && (
                <LoadMoreButton text="Load More" callback={loadMoreMovies} />
            )}
            <hr style={{height: '50px', border: 'none', backgroundColor: '#333'}} />

            {/** SHOWS  **/}
            <Grid header='Popular Shows'>
                {
                    shows.map(show => (
                        <ShowThumb 
                            key={show.id} 
                            clickable 
                            image={show.poster_path 
                                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${show.poster_path}`
                                : NoImage} 
                            showId={show.id}
                            showName={show.original_title}
                        />
                    ))
                }
            </Grid>
            {
                loadingShow && <Spinner/>
            }
            { currentPageShow < totalPagesShow && !loadingShow && (
                <LoadMoreButton text="Load More" callback={loadMoreShows} />
            )}
            <hr style={{height: '50px', border: 'none', backgroundColor: '#333'}} />
        </div>
    )
}

export default HomePage;