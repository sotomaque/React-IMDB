import React from 'react';

import { StyledActor } from '../styles/StyledActor';

const Episode = ({ image, episode }) =>  (
    <StyledActor>
        <img src={image} alt="episode-thumb" />
        <span className="actor-name">{episode.name}</span>
        <span className="actor-character">Rated: {episode.vote_average} / 10</span>
    </StyledActor>
)


export default Episode;