import React from 'react';
import Moment from 'react-moment';

import { StyledMovieInfoBar } from '../styles/StyledMovieInfoBar';

const ActorInfoBar = ({ birthday, knownFor, placeOfBirth }) => {

    return (
        <StyledMovieInfoBar>      
            
            <div className="movieinfobar-content">
                <div className="movieinfobar-content-col">
                    <span className="movieinfobar-info">
                        <Moment fromNow date={birthday} ago/> 
                        {' old'}
                    </span>
                </div>
                <div className="movieinfobar-content-col">
                    <span className="movieinfobar-info">
                        Known For: {knownFor}
                    </span>
                </div>

                <div className="movieinfobar-content-col">
                    <span className="movieinfobar-info">
                        Born in: {placeOfBirth}
                    </span>
                </div>
            </div>
                    
        </StyledMovieInfoBar>
    )
}


export default ActorInfoBar;