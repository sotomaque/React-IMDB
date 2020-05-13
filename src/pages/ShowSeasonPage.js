import React from 'react';
import { useParams } from "react-router-dom";

// Components
import NavigationShow from '../components/Navigation/NavigationShow';

import ShowInfo from '../components/TV/ShowInfo'
import ShowInfoBar from '../components/TV/ShowInfoBar'
import Episode from '../components/TV/Episode'

import Actor from '../components/People/Actor'

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
        <div style={{paddingTop: '50px'}}>
            <NavigationShow title={show.name} seasonNumber={seasonNumber} />
            <ShowInfo show={show} season={season} />
            <ShowInfoBar 
                network={ show?.networks ? show.networks[0] : false}
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
            {/** CAST **/}
            <Grid header="Cast">
                {
                    show.actors.map((actor, index) => (
                        index < 10 &&
                            <Actor key={actor.credit_id} actor={actor} clickable />
                    ))
                }
            </Grid>
            <hr style={{height: '50px', border: 'none', backgroundColor: '#333', marginBottom: '0'}} />
        </div>
    )
}

export default ShowSeasonPage;