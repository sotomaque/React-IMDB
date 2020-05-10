import React from 'react';

import NoImage from '../../images/no_image.jpg';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config';

import ShowThumb from './ShowThumb';

import { StyledMovieInfo } from '../styles/StyledMovieInfo';

const ShowInfo = ({ show, season }) => {
    
    
    if (!season) {
        return (
            <StyledMovieInfo backdrop={show.backdrop_path}>
                <div className="movieinfo-content">

                    <div className="movieinfo-thumb">
                        <ShowThumb
                            image={
                                show.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${show.poster_path}`
                                    : NoImage
                            }
                            clickable={false}
                        />
                    </div>

                    <div className="movieinfo-text">
                        <h1>{show.name}</h1>
                        <h3>Plot</h3>
                        <p>{show.overview}</p>
            

                        <div className="rating-director">
                            <div>
                                <h3>IMDB RATING</h3>
                                <div className="score">{show.vote_average}</div>
                            </div>
                        
                        </div>
                    </div>

                </div>
                
            </StyledMovieInfo>
        )
    }

    return (
        <StyledMovieInfo backdrop={show.backdrop_path}>
            <div className="movieinfo-content">

                <div className="movieinfo-thumb">
                    <ShowThumb
                        image={
                            show.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${show.poster_path}`
                                : NoImage
                        }
                        clickable={false}
                    />
                </div>

                <div className="movieinfo-text">
                    <h1>{season.name}</h1>
                    <h3>Plot</h3>
                    <p>{season.overview}</p>
        

                    <div className="rating-director">
                        <div>
                            <h3>IMDB RATING</h3>
                            <div className="score">{show.vote_average}</div>
                        </div>
                    
                    </div>
                </div>

            </div>
            
        </StyledMovieInfo>
    )
}


export default ShowInfo;