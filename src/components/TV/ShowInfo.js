import React from "react";
import { useHistory } from "react-router-dom";

import { Chip } from "@material-ui/core";
import NoImage from "../../images/no_image.jpg";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";

import ShowThumb from "./ShowThumb";

import { StyledMovieInfo } from "../styles/StyledMovieInfo";

const ShowInfo = ({ show, season }) => {
  const history = useHistory();

  if (!season) {
    return (
      <StyledMovieInfo backdrop={show.backdrop_path}>
        <div className="movieinfo-content">
          <div className="movieinfo-thumb">
            <ShowThumb
              image={
                show.poster_path
                  ? `${IMAGE_BASE_URL}${POSTER_SIZE}${show.poster_path}`
                  : NoImage
              }
              clickable={false}
            />
          </div>

          <div className="movieinfo-text">
            <h1>{show.name}</h1>
            <h3>Plot</h3>
            <p>{show.overview}</p>

            <div className="rating-director">
              <div>
                <h3>RATING</h3>
                <div className="score">{show.vote_average}</div>
              </div>

              {
                show.created_by.length !== 0 ? (
                  <div className="director">
                    <h3>CREATOR{show.created_by.length > 1 ? "S" : ""}</h3>
                    {show.created_by.map((creator) => (
                      <p
                        key={creator.credit_id}
                        onClick={() =>
                          history.push(`/people/${creator.id}`)
                        }
                        style={{ cursor: "pointer" }}
                      >
                        {creator.name}
                      </p>
                    ))}
                  </div>
                ) : (
                <div className="director"></div>
                )
              }

              {
                show.genres.length !== 0 ? (
                  <div className="genres">
                    <h3>GENRE{show.genres.length > 1 ? "S" : ""}</h3>
                    {show.genres.map((genre) => (
                      <Chip
                        color="default"
                        key={genre.id}
                        label={genre.name}
                        clickable
                        style={{ margin: "5px" }}
                        onClick={() =>
                          history.push(
                            `/shows/genre/${genre.name}/${genre.id}`
                          )
                        }
                      />
                    ))}
                  </div>
                ) : (
                  <div className="genres"></div>
                )
              }
              
            </div>
          </div>
        </div>
      </StyledMovieInfo>
    );
  }

  return (
    <StyledMovieInfo backdrop={show.backdrop_path}>
      <div className="movieinfo-content">
        <div className="movieinfo-thumb">
          <ShowThumb
            image={
              show.poster_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${show.poster_path}`
                : NoImage
            }
            clickable={false}
          />
        </div>

        <div className="movieinfo-text">
          <h1>{season.name}</h1>
          {
            season.overview !== "" && (
              <>
                <h3>Plot</h3>
                <p>{season.overview}</p>
              </>
            )
          }


          <div className="rating-director">
            <div>
              <h3>RATING</h3>
              <div className="score">{show.vote_average}</div>
            </div>
          </div>
        </div>
      </div>
    </StyledMovieInfo>
  );
};

export default ShowInfo;
