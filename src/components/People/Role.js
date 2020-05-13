import React from 'react';
import { Link } from 'react-router-dom';

import NoImage from '../../images/no_image.jpg';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config';

import { StyledRole } from '../styles/StyledRole';

const Role = ({ title, character, role, clickable, show, job }) =>  {

    // used to show role as crew member of a show
    if (job && show) {
        return (
            <StyledRole>
                {clickable ? (
                    <Link to={`/React-IMDB/shows/${role.id}`}>
                        <img 
                        src={role.poster_path
                            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${role.poster_path}` 
                            : NoImage } alt="show-thumb" 
                        />
                    </Link>
                ) : (
                    <img 
                    src={role.poster_path
                        ? `${IMAGE_BASE_URL}${POSTER_SIZE}${role.poster_path}` 
                        : NoImage } alt="show-thumb" 
                    />
                )}
                <span className="role-name">{title}</span>
                <span className="role-character">{job}</span>
            </StyledRole>
        )
    }

    if (job && !show) {
        return (
            <StyledRole>
                {clickable ? (
                    <Link to={`/React-IMDB/movies/${role.id}`}>
                        <img 
                        src={role.poster_path
                            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${role.poster_path}` 
                            : NoImage } alt="show-thumb" 
                        />
                    </Link>
                ) : (
                    <img 
                    src={role.poster_path
                        ? `${IMAGE_BASE_URL}${POSTER_SIZE}${role.poster_path}` 
                        : NoImage } alt="show-thumb" 
                    />
                )}
                <span className="role-name">{title}</span>
                <span className="role-character">{job}</span>
            </StyledRole>
        )
    }

    // when used to show role in a movie
    if (!show) {
        return (
            <StyledRole>
                {clickable ? (
                    <Link to={`/React-IMDB/movies/${role.id}`}>
                        <img 
                        src={role.poster_path
                            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${role.poster_path}` 
                            : NoImage } alt="movie-thumb" 
                        />
                    </Link>
                ) : (
                    <img 
                    src={role.poster_path
                        ? `${IMAGE_BASE_URL}${POSTER_SIZE}${role.poster_path}` 
                        : NoImage } alt="movie-thumb" 
                    />
                )}
                <span className="role-name">{title}</span>
                <span className="role-character">{character}</span>
            </StyledRole>
        )
    }
    

    if (show) {
        return (
            <StyledRole>
                {clickable ? (
                    <Link to={`/React-IMDB/shows/${role.id}`}>
                        <img 
                        src={role.poster_path
                            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${role.poster_path}` 
                            : NoImage } alt="show-thumb" 
                        />
                    </Link>
                ) : (
                    <img 
                    src={role.poster_path
                        ? `${IMAGE_BASE_URL}${POSTER_SIZE}${role.poster_path}` 
                        : NoImage } alt="show-thumb" 
                    />
                )}
                <span className="role-name">{title}</span>
                <span className="role-character">{character}</span>
            </StyledRole>
        )
    }

    

}

export default Role;