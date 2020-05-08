import React from 'react';
import { useParams } from "react-router-dom";
// Components
import Navigation from './elements/Navigation';
import ActorInfo from './elements/ActorInfo'
import Role from './elements/Role'
import MovieInfoBar from './elements/MovieInfoBar'

import Grid from './elements/Grid';
import Spinner from './elements/Spinner';

// Hooks
import { useActorFetch } from './hooks/useActorFetch';

const ActorPage = () => {

    let { actorId } = useParams();
    const [actor, loading, error] = useActorFetch(actorId);
    
    if (error) return <div>Something went wrong...</div>;
    if (loading) return <Spinner/> ;

    console.log(actor)

    return (
        <>
            <Navigation actor title={actor.name} />
            <ActorInfo actor={actor} />
            <Grid header="Known For">
                {
                    actor.roles.map((role, index) => (
                        index < 10 &&
                            <Role key={role.credit_id} title={role.title} character={role.character} role={role} clickable />
                    ))
                }
            </Grid>
        </>
    )
}

export default ActorPage;