import React from "react";
import { useHistory } from 'react-router-dom';

import { Chip } from "@material-ui/core";
import NoImage from "../../images/no_image.jpg";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";

import MovieThumb from "./MovieThumb";

import { StyledMovieInfo } from "../styles/StyledMovieInfo";

const MovieInfo = ({ movie }) => {

  const history = useHistory();

  return (
    <StyledMovieInfo backdrop={movie.backdrop_path}>
      <div className="movieinfo-content">
        <div className="movieinfo-thumb">
          <MovieThumb
            image={
              movie.poster_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                : NoImage
            }
            clickable={false}
          />
        </div>

        <div className="movieinfo-text">
          <h1>{movie.title}</h1>
          <h3>Plot</h3>
          <p>{movie.overview}</p>

          <div className="rating-director">
            <div>
              <h3>RATING</h3>
              <div className="score">{movie.vote_average}</div>
            </div>

            <div className="director">
              <h3>DIRECTOR{movie.directors.length > 1 ? "S" : ""}</h3>
              {movie.directors.map((director) => {
                console.log(director)
                return (
                <p key={director.credit_id} onClick={() => history.push(`/React-IMDB/people/${director.id}`)} >{director.name}</p>
              )})}
            </div>

            <div className="genres">
              <h3>GENRE{movie.genres.length > 1 ? "S" : ""}</h3>
              {movie.genres.map((genre) => (
                <Chip
                  color="default"
                  key={genre.id}
                  label={genre.name}
                  clickable
                  style={{ margin: "5px" }}
                  onClick={() => history.push(`/React-IMDB/genre/${genre.name}/${genre.id}`)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </StyledMovieInfo>
  );
};

export default MovieInfo;
