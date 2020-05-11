import React from "react";
import Moment from "react-moment";
import Confetti from "react-confetti";

import { IMAGE_BASE_URL, LOGO_SIZE } from '../../config';
import { StyledMovieInfoBar } from "../styles/StyledMovieInfoBar";

const ShowInfoBar = ({ network, seasons, episodes, firstAirDate, homepage }) => {
  const [agoClicked, setAgoClicked] = React.useState(false);
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [hasShownConfetti, setHasShownConfetti] = React.useState(false);

  React.useEffect(() => {
    if (agoClicked && !hasShownConfetti) {
      setShowConfetti(true);
      setHasShownConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    }
  }, [agoClicked, hasShownConfetti]);

  return (
    <StyledMovieInfoBar>
      {showConfetti && <Confetti />}
      <div className="movieinfobar-content">
        {/** NETWORK LOGO or SEASON COUNT **/}
        <div className="movieinfobar-content-col">
        {
            network ? (<img src={`${IMAGE_BASE_URL}${LOGO_SIZE}${network.logo_path}`} />) : (
                <span className="movieinfobar-info">Seasons: {seasons}</span>
            )
        }
        </div>

        {/** EPIOSODE COUNT **/}
        <div className="movieinfobar-content-col">
          <span className="movieinfobar-info">Episodes: {episodes}</span>
        </div>

        {/** AIR DATE **/}
        <div className="movieinfobar-content-col">
          {!agoClicked ? (
            <span
              className="movieinfobar-info"
              onClick={() => setAgoClicked((prev) => !prev)}
            >
              Originally Aired: <Moment fromNow date={firstAirDate} />
            </span>
          ) : (
            <span
              className="movieinfobar-info"
              onClick={() => setAgoClicked((prev) => !prev)}
            >
              Originally Aired On:{" "}
              <Moment format="MM/DD/YYYY">{firstAirDate}</Moment>
            </span>
          )}
        </div>
      </div>
    </StyledMovieInfoBar>
  );
};

export default ShowInfoBar;
