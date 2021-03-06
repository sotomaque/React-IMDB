import React from 'react';

import Netflix from '../../images/netflix.png'

import { calcTime, convertMoney } from '../../helpers';

import { StyledMovieInfoBar } from '../styles/StyledMovieInfoBar';

const MovieInfoBar = ({ time, budget, revenue, homepage }) => {

    let isOnNetflix = false;
    isOnNetflix = `${homepage}`.includes('netflix');

    return (
        <StyledMovieInfoBar>      
                {
                    !isOnNetflix ? (
                        <div className="movieinfobar-content">
                            <div className="movieinfobar-content-col">
                                <span className="movieinfobar-info">
                                    Running Time: {calcTime(time)}
                                </span>
                            </div>
                            <div className="movieinfobar-content-col">
                                <span className="movieinfobar-info">
                                    Budget: {convertMoney(budget)}
                                </span>
                            </div>

                            <div className="movieinfobar-content-col">
                                <span className="movieinfobar-info">
                                    Revenue: {convertMoney(revenue)}
                                </span>
                            </div>
                        </div>
                    ) : (
    
                        <div className="movieinfobar-netflix">
                            <span className="movieinfobar-info">
                                <a href={`${homepage}`} rel="noopener noreferrer" target="_blank">
                                    <img src={Netflix} alt="watch on netflix" style={{width: '120px'}}/>
                                </a>
                            </span>
                        </div>
                        
                    )
                }
        </StyledMovieInfoBar>
    )
}


export default MovieInfoBar;