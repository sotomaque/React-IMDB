import React from 'react';
import { useParams } from "react-router-dom";
// Components
import NavigationShow from './elements/NavigationShow';
import ShowInfo from './elements/ShowInfo'
import MovieInfoBar from './elements/MovieInfoBar'
import Actor from './elements/Actor'

import Grid from './elements/Grid';
import Spinner from './elements/Spinner';

// Hooks
import { useShowFetch } from './hooks/useShowFetch';

const ShowPage = () => {

    let { showId } = useParams();
    const [show, loading, error] = useShowFetch(showId);

    if (error) return <div>Something went wrong...</div>;
    if (loading) return <Spinner/> ;

    return (
        <>
            <NavigationShow title={show.original_name} />
            <ShowInfo movie={show} />
            <MovieInfoBar time={show.runtime} homepage={show.homepage} budget={show.budget} revenue={show.revenue}/>
            <Grid header="Actors">
                {
                    show.actors.map((actor, index) => (
                        index < 10 &&
                            <Actor key={actor.credit_id} actor={actor} clickable />
                    ))
                }
            </Grid>
        </>
    )
}

export default ShowPage;