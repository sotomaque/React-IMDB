import React from 'react';

import { StyledMovieInfoBar } from '../styles/StyledMovieInfoBar';

const ActorInfoBar = ({ birthday, knownFor, placeOfBirth }) => {

    return (
        <StyledMovieInfoBar>      
            
            <div className="movieinfobar-content">
                <div className="movieinfobar-content-col">
                    <span className="movieinfobar-info">
                        Birthday: {birthday}
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