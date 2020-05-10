import React from 'react';
import { Link } from 'react-router-dom';

import { StyledThumb } from '../styles/StyledThumb';

const ShowThumb = ({ image, showId, clickable }) => (
  <StyledThumb>
    {clickable ? (
      <Link to={`/React-IMDB/shows/${showId}`}>
        <img className="clickable" src={image} alt="show-thumb" />
      </Link>
    ) : (
      <img src={image} alt="show-thumb" />
    )}
  </StyledThumb>
)

export default ShowThumb;
