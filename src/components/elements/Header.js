import React from 'react';
import { Link } from 'react-router-dom';

// styled components
import { StyledHeader, StyledRMDBLogo, StyledTMDBLogo } from '../styles/StyledHeader';

// images
import RMDBLogo from '../images/reactMovie_logo.png';
import TMDBLogo from '../images/tmdb_logo.svg';

const Header = () => (
    <StyledHeader>
        <div className="header-content">
            <Link to='/'>
                <StyledRMDBLogo src={RMDBLogo} alt='rmdb-logo' />
            </Link>
            
            <StyledTMDBLogo src={TMDBLogo} alt='tmdb-logo' />
        </div>
    </StyledHeader>
)

export default Header;