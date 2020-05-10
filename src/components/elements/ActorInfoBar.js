import React from 'react';
import FontAwesome from 'react-fontawesome';

import Netflix from '../../images/netflix.png'


import { StyledMovieInfoBar } from '../styles/StyledMovieInfoBar';

const ActorInfoBar = ({ birthday, knownFor, placeOfBirth }) => {

    return (
        <StyledMovieInfoBar>      
            
            <div className="movieinfobar-content">
                <div className="movieinfobar-content-col">
                    <FontAwesome className="fa-time" name="clock-o" size="2x" />
                    <span className="movieinfobar-info">
                        Birthday: {birthday}
                    </span>
                </div>
                <div className="movieinfobar-content-col">
                    <FontAwesome className="fa-budget" name="money" size="2x" />
                    <span className="movieinfobar-info">
                        knownFor: {knownFor}
                    </span>
                </div>

                <div className="movieinfobar-content-col">
                <FontAwesome className="fa-revenue" name="ticket" size="2x" />
                    <span className="movieinfobar-info">
                        placeOfBirth: {placeOfBirth}
                    </span>
                </div>
            </div>
                    
        </StyledMovieInfoBar>
    )
}


export default ActorInfoBar;