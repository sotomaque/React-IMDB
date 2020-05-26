import React from 'react';
import { Link } from 'react-router-dom';

import NoImage from '../../images/no_image.jpg';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config';

import { StyledActor } from '../styles/StyledActor';

const CrewMember = ({ member, clickable }) =>  (
    <StyledActor>
        {clickable ? (
            <Link to={`/people/${member.id}`}>
                <img 
                src={member.profile_path 
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${member.profile_path}` 
                    : NoImage } alt="actor-thumb" 
                />
            </Link>
        ) : (
            <img 
            src={member.profile_path 
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${member.profile_path}` 
                : NoImage } alt="actor-thumb" 
            />
        )}
  
        <span className="actor-name">{member.name}</span>
        <span className="actor-character">{member.job}</span>
    </StyledActor>
)


export default CrewMember;