import React from "react";
import { Link, useParams } from "react-router-dom";

import { StyledThumb } from "../styles/StyledThumb";

const ShowSeasonThumb = ({ image, seasonNumber, clickable }) => {
  let { showId } = useParams();

  return (
    <StyledThumb>
      {clickable ? (
        <Link to={`/shows/${showId}/season/${seasonNumber}`}>
          <img className="clickable" src={image} alt="show-thumb" />
        </Link>
      ) : (
        <img src={image} alt="show-thumb" />
      )}
    </StyledThumb>
  );
};

export default ShowSeasonThumb;
