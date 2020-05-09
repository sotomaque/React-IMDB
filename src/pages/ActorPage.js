import React from 'react';
import { useParams } from "react-router-dom";

// Components
import Navigation from '../components/elements/Navigation';
import ActorInfo from '../components/elements/ActorInfo'
import Role from '../components/elements/Role'

import Grid from '../components/elements/Grid';
import Spinner from '../components/elements/Spinner';

// Hooks
import { useActorFetch } from '../hooks/useActorFetch';

const ActorPage = () => {

    let { actorId } = useParams();
    const [actor, loading, error] = useActorFetch(actorId);
    
    if (error) return <div>Something went wrong...</div>;
    if (loading) return <Spinner/> ;

    return (
        <div style={{paddingTop: '60px'}}>
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
        </div>
    )
}

export default ActorPage;