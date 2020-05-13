import React from 'react';
import { useParams } from "react-router-dom";
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../config';
import NoImage from '../images/no_image.jpg';

// Components
import ShowThumb from '../components/TV/ShowThumb';
import LoadMoreButton from '../components/elements/LoadMoreButton';
import HeroImage from '../components/elements/HeroImage';
import Grid from '../components/elements/Grid';
import Spinner from '../components/elements/Spinner';

// Hooks
import { useShowsByGenreFetch } from '../hooks/useShowsByGenreFetch';


const GenreShowsPage = () => {
    let { genreId, genreName } = useParams();
    const [{ state: { shows, heroImage, currentPage, totalPages }, loading, error }, fetchShowsByGenre ] = useShowsByGenreFetch(genreId);

    if (!shows[0] || loading) return <Spinner/> ;
    if (error) return <div>Something went wrong...</div>;

    const loadMoreShows = () => {
        fetchShowsByGenre(`${API_URL}discover/tv?api_key=${API_KEY}&with_genres=${genreId}&page=${currentPage + 1}`);
    }

    return (
        <div style={{paddingTop: '60px'}}>
            <HeroImage 
                image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
                title={heroImage.original_title}
                text={heroImage.overview}
            />
            <Grid header={`${genreName} Series`}>
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
                loading && <Spinner/>
            }
            { currentPage < totalPages && !loading && 
                <LoadMoreButton text="Load More" callback={loadMoreShows} />
            }
            <hr style={{height: '50px', border: 'none', backgroundColor: '#333', marginBottom: '0'}} />
        </div>
    )
}

export default GenreShowsPage;