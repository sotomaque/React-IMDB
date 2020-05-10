import React from 'react';

import NoImage from '../../images/no_image.jpg';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config';

import MovieThumb from './MovieThumb';

import { StyledActorInfo } from '../styles/StyledActorInfo';

const ActorInfo = ({ actor }) => (
    <StyledActorInfo>
        <div className="actorinfo-content">
            <div className="actorinfo-thumb">
                <MovieThumb
                    image={
                        actor.profile_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                            : NoImage
                    }
                    clickable={false}
                />
            </div>

            <div className="actorinfo-text">
                <h1>{actor.name}</h1>
                <h3>Biography</h3>
                <p>{actor.biography}</p>

                <div className="rating-director">
                <div>
                  <h3>POPULARITY</h3>
                  <div className="score">{Math.round(actor.popularity * 10) / 10}</div>
                </div>
    
              </div>

            </div>
        </div>
    </StyledActorInfo>
)


export default ActorInfo;