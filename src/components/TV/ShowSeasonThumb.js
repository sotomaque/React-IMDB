import React from "react";
import { Link, useParams } from "react-router-dom";

import { StyledGridElement } from "../styles/StyledGridElement";

const ShowSeasonThumb = ({ image, season, seasonNumber, clickable }) => {
  let { showId } = useParams();
  return (
    <StyledGridElement>
      {clickable ? (
        <>
          <Link to={`/shows/${showId}/season/${seasonNumber}`}>
            <img className="clickable" src={image} alt="show-thumb" />
          </Link>
          <span className="text-title">{season.name}</span>
          <span className="text-subtitle">{season.episode_count} Episodes</span>
        </>
      ) : (
        <>
          <img src={image} alt="show-thumb" />
          <span className="text-title">{season.name}</span>
          <span className="text-subtitle">{season.episodes.length} Episodes</span>
        </>
      )}
    </StyledGridElement>
  );
};

export default ShowSeasonThumb;
