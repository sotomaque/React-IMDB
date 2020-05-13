import React from 'react';
import { useParams } from "react-router-dom";

// Components
import NavigationActor from '../components/Navigation/NavigationActor';

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
            <NavigationActor title={actor.name} />
            <ActorInfo actor={actor} />
            <ActorInfoBar birthday={actor.birthday} knownFor={actor.known_for_department} placeOfBirth={actor.place_of_birth}/>
            {
                actor.movies.length > 0 && (
                    <Grid header="Movie Appearances">
                        {
                            actor.movies.map((role, index) => (
                                role.poster_path &&
                                    <Role key={role.credit_id} title={role.title} character={role.character} role={role} clickable />
                            ))
                        }
                    </Grid>
                )
            }
            
            {
                actor.shows.length > 0 && (
                    <>
                        <hr style={{height: '50px', border: 'none', backgroundColor: '#333'}} />
                        <Grid header="TV Appearances">
                            {
                                actor.shows.map((role, index) => (
                                    role.poster_path &&
                                    <Role 
                                        key={role.credit_id} 
                                        title={role.name} 
                                        character={role.character} 
                                        role={role} 
                                        show={true} 
                                        clickable 
                                    />
                                ))
                            }
                        </Grid>
                    </>
                )
            }

            {
                actor.moviesCrew.length > 0 && (
                    <>
                        <hr style={{height: '50px', border: 'none', backgroundColor: '#333'}} />

                        <Grid header="Crew Member of the Following Movies">
                            {
                                actor.moviesCrew.map(role => (
                                    role.poster_path &&
                                    <Role 
                                        key={role.credit_id} 
                                        title={role.title} 
                                        role={role} 
                                        job={role.job} 
                                        clickable 
                                    />
                                ))
                            }
                        </Grid>
                    </>
                )
            }

            {
                actor.showsCrew.length > 0 && (
                    <>
                        <hr style={{height: '50px', border: 'none', backgroundColor: '#333'}} />

                        <Grid header="Crew Member of the Following Shows">
                            {
                                actor.showsCrew.map(role => (
                                    role.poster_path &&
                                    <Role 
                                        key={role.credit_id} 
                                        title={role.title} 
                                        role={role} 
                                        job={role.job} 
                                        clickable 
                                    />
                                ))
                            }
                        </Grid>
                    </>
                )
            }
            <hr style={{height: '50px', border: 'none', backgroundColor: '#333', marginBottom: '0'}} />

        </div>
    )
}

export default ActorPage;