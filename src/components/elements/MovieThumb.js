import React from 'react';
import { Link } from 'react-router-dom';

import { StyledThumb } from '../styles/StyledThumb';

const MovieThumb = ({ image, movieId, clickable }) => (
  <StyledThumb>
    {clickable ? (
      <Link to={`/React-IMDB/movies/${movieId}`}>
        <img className="clickable" src={image} alt="moviethumb" />
      </Link>
    ) : (
      <img src={image} alt="moviethumb" />
    )}
  </StyledThumb>
)

export default MovieThumb;
