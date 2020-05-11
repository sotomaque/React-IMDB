import React from 'react';

import { StyledGridElement } from '../styles/StyledGridElement';

const Episode = ({ image, episode }) =>  (
    <StyledGridElement>
        <img src={image} alt="episode-thumb" />
        <span className="text-title">{episode.name}</span>
        <span className="text-subtitle">Rated: {episode.vote_average} / 10</span>
    </StyledGridElement>
)


export default Episode;