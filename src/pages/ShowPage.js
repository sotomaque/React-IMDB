import React from 'react';
import { useParams } from "react-router-dom";

// Components
import NavigationShow from '../components/elements/NavigationShow';
import ShowInfo from '../components/elements/ShowInfo'
import ShowInfoBar from '../components/elements/ShowInfoBar'
import ShowSeasonThumb from '../components/elements/ShowSeasonThumb'
import Actor from '../components/elements/Actor'

import Grid from '../components/elements/Grid';
import Spinner from '../components/elements/Spinner';

import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
import NoImage from '../images/no_image.jpg';



// Hooks
import { useShowFetch } from '../hooks/useShowFetch';

const ShowPage = () => {

    let { showId } = useParams();
    const [show, loading, error] = useShowFetch(showId);

    if (error) return <div>Something went wrong...</div>;
    if (loading) return <Spinner/> ;

    return (
        <div style={{paddingTop: '60px'}}>
            <NavigationShow title={show.name} />
            <ShowInfo show={show} />
            <ShowInfoBar 
                seasons={show.number_of_seasons}
                episodes={show.number_of_episodes}
                firstAirDate={show.first_air_date}
            />
            {/** SEASONS **/}
            <Grid header="Seasons">
            {
                show.seasons.map(season => (
                    season.season_number !== 0 && 
                    <ShowSeasonThumb
                        key={season.id}
                        seasonId={season.id}
                        seasonNumber={season.season_number}
                        image={
                            season.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${season.poster_path}`
                                : NoImage
                        }
                        clickable
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
        </div>
    )
}

export default ShowPage;