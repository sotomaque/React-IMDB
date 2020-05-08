import React from 'react';
import { Link } from 'react-router-dom'

// Styled Components
import { StyledNavigation } from '../styles/StyledNavigation';

// TODO: 
//  eclipse movie name capping it at 10 chars long
//

const Navigation = ({ title }) => {

    const movieName = `${title}` ;
    const movieNameLength = movieName.length;
    let formattedMovieName = '';
    movieNameLength > 14 ? formattedMovieName = movieName.substring(0, 14) + '...': formattedMovieName = movieName;


    return (
        <StyledNavigation>
            <div className="navigation-content">
                <Link to='/'>
                    <p>Home</p>
                </Link>
                <p>|</p>
                <p style={{opacity: '0.6'}}>{formattedMovieName}</p>
            </div>
        </StyledNavigation>
    )
}

export default Navigation;