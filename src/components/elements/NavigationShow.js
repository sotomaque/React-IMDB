import React from 'react';
import { Link, useParams } from 'react-router-dom'

// Styled Components
import { StyledNavigation } from '../styles/StyledNavigation';

// TODO: 
//  eclipse movie name capping it at 10 chars long
//

const NavigationShow = ({ title, seasonNumber }) => {

    const { showId } = useParams();
    
    let formattedShowName = '';
    const showName = `${title}`;
    const showNameLength = showName.length;
    showNameLength > 14 ? formattedShowName = showName.substring(0, 14) + '...': formattedShowName = showName;    

    if (!seasonNumber) return (
        <StyledNavigation>
            <div className="navigation-content">
                <Link to='/'>
                    <p>Home</p>
                </Link>

                <p style={{opacity: '0.6'}}>|</p>

                <Link to='/shows'>
                    <p>Shows</p>
                </Link>

                <p style={{opacity: '0.6'}}>|</p>

                <p style={{opacity: '0.6'}}>{formattedShowName}</p> 

            </div>
        </StyledNavigation>
    ) 
    
    return (
        <StyledNavigation>
            <div className="navigation-content">
                <Link to='/'>
                    <p>Home</p>
                </Link>

                <p style={{opacity: '0.6'}}>|</p>

                <Link to='/shows'>
                    <p>Shows</p>
                </Link>

                <p style={{opacity: '0.6'}}>|</p>

                <Link to={`/shows/${showId}`}>
                    <p>{formattedShowName}</p> 
                </Link>
                
                <p style={{opacity: '0.6'}}>|</p>
                <p style={{opacity: '0.6'}}>Season {seasonNumber}</p> 
                       
            </div>
        </StyledNavigation>
    )
    
}

export default NavigationShow;