import React from 'react';

import Netflix from '../../images/netflix.png'

import { StyledMovieInfoBar } from '../styles/StyledMovieInfoBar';

const ShowInfoBar = ({ seasons, episodes, firstAirDate, homepage }) => {

    let isOnNetflix = false;
    isOnNetflix = `${homepage}`.includes('netflix');

    return (
        <StyledMovieInfoBar>      
                {
                    !isOnNetflix ? (
                        <div className="movieinfobar-content">
                            <div className="movieinfobar-content-col">
                                <span className="movieinfobar-info">
                                    Seasons: {seasons}
                                </span>
                            </div>
                            <div className="movieinfobar-content-col">
                                <span className="movieinfobar-info">
                                    Episodes: {episodes}
                                </span>
                            </div>

                            <div className="movieinfobar-content-col">
                                <span className="movieinfobar-info">
                                    First Air Date: {firstAirDate}
                                </span>
                            </div>
                        </div>
                    ) : (
    
                        <div className="movieinfobar-netflix">
                            <span className="movieinfobar-info">
                                <a href={`${homepage}`} target="_blank">
                                    <img src={Netflix} alt="watch on netflix" style={{width: '120px'}}/>
                                </a>
                            </span>
                        </div>
                        
                    )
                }
        </StyledMovieInfoBar>
    )
}


export default ShowInfoBar;