import React from 'react';
import { Link } from 'react-router-dom'

// Styled Components
import { StyledNavigation } from '../styles/StyledNavigation';

// TODO: 
//  eclipse movie name capping it at 10 chars long
//

const NavigationMovie = ({ title }) => {

    
    let formattedMovieName = '';
    const movieName = `${title}`;
    const movieNameLength = movieName.length;
    movieNameLength > 14 ? formattedMovieName = movieName.substring(0, 14) + '...': formattedMovieName = movieName;    

    return (
        <StyledNavigation>
            <div className="navigation-content">
                <Link to='/React-IMDB'>
                    <p>Home</p>
                </Link>

                <p style={{opacity: '0.6'}}>|</p>

                <Link to='/React-IMDB/movies'>
                    <p>Movies</p>
                </Link>
                
                <p style={{opacity: '0.6'}}>|</p>
                
                <p style={{opacity: '0.6'}}>{formattedMovieName}</p>
            </div>
        </StyledNavigation>
    )
}

export default NavigationMovie;