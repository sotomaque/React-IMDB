import React from 'react';

// API CONSTANTS
import { IMAGE_BASE_URL, BACKDROP_SIZE, SEARCH_BASE_URL_SHOWS, POSTER_SIZE, POPULAR_BASE_URL_SHOWS, TOP_RATED_BASE_URL_SHOWS } from '../config';

// Components
import HeroImage from '../components/elements/HeroImage';
import SearchBar from '../components/elements/SearchBar';
import Grid from '../components/elements/Grid';
import LoadMoreButton from '../components/elements/LoadMoreButton';
import Spinner from '../components/elements/Spinner';
import ShowThumb from '../components/elements/ShowThumb';

// Hooks
import { usePopularShowsFetch } from '../hooks/usePopularShowsFetch';
import { useTopRatedShowsFetch } from '../hooks/useTopRatedShowsFetch';

import NoImage from '../images/no_image.jpg';

const ShowsPage = () => {
   
    const [{ state: { shows, heroImageShow, currentPageShow, totalPagesShow }, loadingShow, errorShow }, fetchPopularShows ] = usePopularShowsFetch();
    const [{ state: { topRatedShows, heroImageTopRated, currentPageTopRated, totalPagesTopRated }, loadingTopRated, errorTopRated }, fetchTopRatedShows ] = useTopRatedShowsFetch();
    const [searchTerm, setSearchTerm] = React.useState('');

    if (!shows[0] || !topRatedShows[0])  return <Spinner /> 
    if (errorShow || errorTopRated) return <div>Something went wrong...</div>
    
    const loadMoreShows = () => {
        const endpoint = `${POPULAR_BASE_URL_SHOWS}&page=${currentPageShow + 1}`;
        fetchPopularShows(endpoint);
    }

    const loadMoreTopRatedShows = () => {
        const endpoint = `${TOP_RATED_BASE_URL_SHOWS}&page=${currentPageTopRated + 1}`;
        fetchTopRatedShows(endpoint);
    }

    const searchShows = search => {
        const endpoint = search ? SEARCH_BASE_URL_SHOWS + search : POPULAR_BASE_URL_SHOWS;
        setSearchTerm(search);
        fetchPopularShows(endpoint);
    }

    const heroImageURL = `${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImageShow.backdrop_path}`;
    const heroImageTitle = heroImageShow.original_name;
    const heroImageText = heroImageShow.overview;

    return (
        <div style={{paddingTop: '60px'}}>
            {
                !searchTerm && (
                    <HeroImage 
                        image={heroImageURL}
                        title={heroImageTitle}
                        text={heroImageText}
                    />
                )
            }
            <SearchBar title="Search Shows..." callback={searchShows} />

            <Grid header={searchTerm ? searchTerm : 'Popular Shows'}>
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
            {   currentPageShow < totalPagesShow && !loadingShow && 
                    <LoadMoreButton text="Load More" callback={loadMoreShows} />
            }
            <hr style={{height: '50px', border: 'none', backgroundColor: '#333'}} />
            {
                !searchTerm && (
                    <Grid header={'Top Rated Shows'}>
                        {
                            topRatedShows.map(show => (
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
                )
            }
            { currentPageTopRated < totalPagesTopRated && !loadingTopRated && !searchTerm && 
                
                <LoadMoreButton text="Load More" callback={loadMoreTopRatedShows} />
                
            }
            {
                loadingTopRated && <Spinner/>
            }
        </div>
    )
}

export default ShowsPage;