import React from 'react';

import NoImage from '../../images/no_image.jpg';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config';

import MovieThumb from './MovieThumb';

import { StyledMovieInfo } from '../styles/StyledMovieInfo';

const ShowInfo = ({ movie }) => (
    <StyledMovieInfo backdrop={movie.backdrop_path}>
        <div className="movieinfo-content">

            <div className="movieinfo-thumb">
                <MovieThumb
                    image={
                        movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                            : NoImage
                    }
                    clickable={false}
                />
            </div>

            <div className="movieinfo-text">
                <h1>{movie.title}</h1>
                <h3>Plot</h3>
                <p>{movie.overview}</p>
      

                <div className="rating-director">
                    <div>
                        <h3>IMDB RATING</h3>
                        <div className="score">{movie.vote_average}</div>
                    </div>
                   
                </div>
            </div>

        </div>
        
    </StyledMovieInfo>
)


export default ShowInfo;