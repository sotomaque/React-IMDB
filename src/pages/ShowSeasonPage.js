import React from 'react';
import { useParams } from "react-router-dom";

// Components
import NavigationShow from '../components/elements/NavigationShow';
import ShowInfo from '../components/elements/ShowInfo'
import ShowInfoBar from '../components/elements/ShowInfoBar'
import Episode from '../components/elements/Episode'
import Actor from '../components/elements/Actor'

import Grid from '../components/elements/Grid';
import Spinner from '../components/elements/Spinner';

import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
import NoImage from '../images/no_image.jpg';

// Hooks
import { useShowFetch } from '../hooks/useShowFetch';
import { useShowSeasonFetch } from '../hooks/useShowSeasonFetch';

const ShowSeasonPage = () => {

    let { showId, seasonNumber } = useParams();
    const [show, loading, error] = useShowFetch(showId);
    const [season, seasonLoading, seasonError] = useShowSeasonFetch(showId, seasonNumber);

    if (error || seasonError) return <div>Something went wrong...</div>;
    if (loading || seasonLoading) return <Spinner/>;

    return (
        <div style={{paddingTop: '60px'}}>
            <NavigationShow title={show.name} seasonNumber={seasonNumber} />
            <ShowInfo show={show} season={season} />
            <ShowInfoBar 
                seasons={show.number_of_seasons}
                episodes={season.episodes.length}
                firstAirDate={season.air_date}
            />
            {/** EPISODES **/}
            <Grid header="Episodes">
            {
                season.episodes.map(episode => (
                    <Episode
                        key={episode.id}
                        episode={episode}
                        image={
                            episode.still_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${episode.still_path}`
                                : NoImage
                        }
                    />
                ))
            }
            </Grid>
            <hr style={{height: '50px', border: 'none', backgroundColor: '#333'}} />
            {/** ACTORS **/}
            <Grid header="Cast">
                {
                    show.actors.map((actor, index) => (
                        index < 10 &&
                            <Actor key={actor.credit_id} actor={actor} clickable />
                    ))
                }
            </Grid>
            <hr style={{height: '50px', border: 'none', backgroundColor: '#333'}} />
        </div>
    )
}

export default ShowSeasonPage;