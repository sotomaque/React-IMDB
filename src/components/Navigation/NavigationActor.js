import React from 'react';
import { Link } from 'react-router-dom'

// Styled Components
import { StyledNavigation } from '../styles/StyledNavigation';

// TODO: 
//  eclipse movie name capping it at 10 chars long
//

const NavigationActor = ({ title }) => {

    
    let formattedActorName = '';
    const actorName = `${title}`;
    const actorNameLength = actorName.length;
    actorNameLength > 14 ? formattedActorName = actorName.substring(0, 14) + '...': formattedActorName = actorName;    

    return (
        <StyledNavigation>
            <div className="navigation-content">
                <Link to='/'>
                    <p>Home</p>
                </Link>

                <p style={{opacity: '0.6'}}>|</p>

                <Link to='/people'>
                    <p>People</p>
                </Link>
                
                <p style={{opacity: '0.6'}}>|</p>
                
                <p style={{opacity: '0.6'}}>{formattedActorName}</p>
            </div>
        </StyledNavigation>
    )
}

export default NavigationActor;