import React from 'react';
import { useParams } from "react-router-dom";

// Components
import Navigation from '../components/Navigation/Navigation';

import ActorInfo from '../components/People/ActorInfo';
import ActorInfoBar from '../components/People/ActorInfoBar';
import Role from '../components/People/Role'

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
            <ActorInfoBar birthday={actor.birthday} knownFor={actor.known_for_department} placeOfBirth={actor.place_of_birth}/>
            <Grid header="Known For">
                {
                    actor.roles.map((role, index) => (
                        index < 10 &&
                            <Role key={role.credit_id} title={role.title} character={role.character} role={role} clickable />
                    ))
                }
            </Grid>
            <hr style={{height: '50px', border: 'none', backgroundColor: '#333', marginBottom: '0'}} />

        </div>
    )
}

export default ActorPage;