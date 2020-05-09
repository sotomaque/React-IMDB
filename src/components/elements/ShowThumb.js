import React from 'react';
import { Link } from 'react-router-dom';

import { StyledMovieThumb } from '../styles/StyledMovieThumb';

const ShowThumb = ({ image, showId, clickable }) => (
  <StyledMovieThumb>
    {clickable ? (
      <Link to={`/show/${showId}`}>
        <img className="clickable" src={image} alt="show-thumb" />
      </Link>
    ) : (
      <img src={image} alt="show-thumb" />
    )}
  </StyledMovieThumb>
)

export default ShowThumb;
