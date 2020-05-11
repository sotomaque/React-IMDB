import React from 'react';
import Moment from 'react-moment';
import Confetti from 'react-confetti';

import Netflix from '../../images/netflix.png'

import { StyledMovieInfoBar } from '../styles/StyledMovieInfoBar';

const ShowInfoBar = ({ seasons, episodes, firstAirDate, homepage }) => {

    const [agoClicked, setAgoClicked] = React.useState(false);
    const [showConfetti, setShowConfetti] = React.useState(false);
    const [hasShownConfetti, setHasShownConfetti] = React.useState(false);

    React.useEffect(() => {
        if (agoClicked && !hasShownConfetti) {
            setShowConfetti(true);
            setHasShownConfetti(true);
            setTimeout(() => {
                setShowConfetti(false);
            }, 5000)
        }
    }, [agoClicked, hasShownConfetti]);

    let isOnNetflix = false;
    isOnNetflix = `${homepage}`.includes('netflix');

    return (
        <StyledMovieInfoBar>      
         { showConfetti && <Confetti />}
                {
                    !isOnNetflix ? (
                        <div className="movieinfobar-content">
                            <div className="movieinfobar-content-col">
                                <span className="movieinfobar-info">
                                    Seasons: {seasons}
                                </span>
                            </div>
                            <div className="movieinfobar-content-col">
                                <span className="movieinfobar-info">
                                    Episodes: {episodes}
                                </span>
                            </div>

                            <div className="movieinfobar-content-col">
                                {
                                    !agoClicked ? (
                                        <span className="movieinfobar-info" onClick={() => setAgoClicked(prev => !prev)}>
                                            Originally Aired:{' '}
                                            <Moment fromNow date={firstAirDate} /> 
                                        </span>
                                    ) : (
                                        <span className="movieinfobar-info" onClick={() => setAgoClicked(prev => !prev)}>
                                            Originally Aired On:{' '}
                                            <Moment format="MM/DD/YYYY">{firstAirDate}</Moment>
                                        </span>
                                    )
                                }

                            </div>
                        </div>
                    ) : (
    
                        <div className="movieinfobar-netflix">
                            <span className="movieinfobar-info">
                                <a href={`${homepage}`} target="_blank" rel="noopener noreferrer">
                                    <img src={Netflix} alt="watch on netflix" style={{width: '120px'}}/>
                                </a>
                            </span>
                        </div>
                        
                    )
                }
        </StyledMovieInfoBar>
    )
}


export default ShowInfoBar;