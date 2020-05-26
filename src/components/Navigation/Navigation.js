import React from 'react';
import { Link } from 'react-router-dom'

// Styled Components
import { StyledNavigation } from '../styles/StyledNavigation';

// TODO: 
//  eclipse movie name capping it at 10 chars long
//

const Navigation = ({ title, movie, actor }) => {

    let formattedMovieName = '';
    if (!actor) {
        const movieName = `${title}` ;
        const movieNameLength = movieName.length;
        movieNameLength > 14 ? formattedMovieName = movieName.substring(0, 14) + '...': formattedMovieName = movieName;    
    } else {
        formattedMovieName=title;
    }
    

    return (
        <StyledNavigation>
            <div className="navigation-content">
                <Link to='/'>
                    <p>Home</p>
                </Link>
                <p>|</p>
                { actor && <><p>People</p><p>|</p></>}
                <p style={{opacity: '0.6'}}>{formattedMovieName}</p>
            </div>
        </StyledNavigation>
    )
}

export default Navigation;