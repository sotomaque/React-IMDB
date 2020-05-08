import React from 'react';
import { Link } from 'react-router-dom';

import NoImage from '../images/no_image.jpg';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config';

import { StyledActor } from '../styles/StyledActor';

const Actor = ({ actor, clickable }) =>  (
    <StyledActor>
        {clickable ? (
            <Link to={`/actor/${actor.id}`}>
                <img 
                src={actor.profile_path 
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}` 
                    : NoImage } alt="actor-thumb" 
                />
            </Link>
        ) : (
            <img 
            src={actor.profile_path 
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}` 
                : NoImage } alt="actor-thumb" 
            />
        )}
  
        <span className="actor-name">{actor.name}</span>
        <span className="actor-character">{actor.character}</span>
    </StyledActor>
)


export default Actor;