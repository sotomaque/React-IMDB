import React from "react";
import { useParams } from "react-router-dom";
import uuid from "react-uuid";

import { IMAGE_BASE_URL, POSTER_SIZE, API_URL, API_KEY } from "../config";
import NoImage from "../images/no_image.jpg";

// Components
import NavigationShow from "../components/Navigation/NavigationShow";

import ShowInfo from "../components/TV/ShowInfo";
import ShowInfoBar from "../components/TV/ShowInfoBar";
import ShowSeasonThumb from "../components/TV/ShowSeasonThumb";
import ShowThumb from "../components/TV/ShowThumb";

import Actor from "../components/People/Actor";

import Grid from "../components/elements/Grid";
import Spinner from "../components/elements/Spinner";
import LoadMoreButton from "../components/elements/LoadMoreButton";

// Hooks
import { useShowFetch } from "../hooks/useShowFetch";
import { useSimilarShowsFetch } from "../hooks/useSimilarShowsFetch";
import { useRecommendedShowsFetch } from "../hooks/useRecommendedShowsFetch";

const ShowPage = () => {
  let { showId } = useParams();
  const [show, loading, error] = useShowFetch(showId);
  const [
    {
      state: { similarShows, currentPageSimilar, totalPagesSimilar },
      loadingSimilar,
      errorSimilar,
    },
    fetchSimilarShows,
  ] = useSimilarShowsFetch(showId);
  const [
    {
      state: { recommendedShows, currentPageRec, totalPagesRec },
      loadingRec,
      errorRec,
    },
    fetchRecommendedShows,
  ] = useRecommendedShowsFetch(showId);

  if (error || errorSimilar || errorRec)
    return <div>Something went wrong...</div>;
  if (loading || loadingSimilar || loadingRec) return <Spinner />;

  const loadMoreSimilarShows = () => {
    const endpoint = `${API_URL}tv/${showId}/similar?api_key=${API_KEY}&page=${
      currentPageSimilar + 1
    }`;
    fetchSimilarShows(endpoint);
  };

  const loadMoreRecommendations = () => {
    const endpoint = `${API_URL}tv/${showId}/recommendations?api_key=${API_KEY}&page=${
      currentPageRec + 1
    }`;
    fetchRecommendedShows(endpoint);
  };

  return (
    <div style={{ paddingTop: "50px" }}>
      <NavigationShow title={show.name} />
      <ShowInfo show={show} />
      <ShowInfoBar
        seasons={show.number_of_seasons}
        episodes={show.number_of_episodes}
        firstAirDate={show.first_air_date}
      />
      {/** SEASONS **/}
      <Grid header="Seasons">
        {show.seasons.map(
          (season) =>
            season.season_number !== 0 && (
              <ShowSeasonThumb
                key={season.id}
                seasonId={season.id}
                seasonNumber={season.season_number}
                season={season}
                image={
                  season.poster_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${season.poster_path}`
                    : NoImage
                }
                clickable
              />
            )
        )}
      </Grid>
      {/** CAST **/}
      <hr style={{ height: "50px", border: "none", backgroundColor: "#333" }} />
      <Grid header="Cast">
        {show.actors.map(
          (actor, index) =>
            index < 5 && <Actor key={actor.credit_id} actor={actor} clickable />
        )}
      </Grid>
      {/** RECOMMENDED SHOWS **/}
      {recommendedShows.length !== 0 && (
        <>
          <hr
            style={{ height: "50px", border: "none", backgroundColor: "#333" }}
          />
          <Grid header="Recommended Shows">
            {recommendedShows.map(
              (show) =>
                show.id.toString !== showId.toString && (
                  <ShowThumb
                    key={show.id}
                    clickable
                    image={
                      show.poster_path
                        ? `${IMAGE_BASE_URL}${POSTER_SIZE}${show.poster_path}`
                        : NoImage
                    }
                    showId={show.id}
                    showName={show.original_title}
                  />
                )
            )}
          </Grid>
          {currentPageRec < totalPagesRec && !loadingRec && (
            <LoadMoreButton
              text="Load More"
              callback={loadMoreRecommendations}
            />
          )}
          {loadingRec && <Spinner />}
        </>
      )}

      {similarShows.length !== 0 && (
        <>
          {/** SIMILAR SHOWS **/}
          <hr
            style={{ height: "50px", border: "none", backgroundColor: "#333" }}
          />
          <Grid header="Similar Shows">
            {similarShows.map(
              (show) =>
                show.id.toString !== showId.toString && (
                  <ShowThumb
                    key={uuid()}
                    clickable
                    image={
                      show.poster_path
                        ? `${IMAGE_BASE_URL}${POSTER_SIZE}${show.poster_path}`
                        : NoImage
                    }
                    showId={show.id}
                    showName={show.original_title}
                  />
                )
            )}
          </Grid>
          {currentPageSimilar < totalPagesSimilar && !loadingSimilar && (
            <LoadMoreButton text="Load More" callback={loadMoreSimilarShows} />
          )}
          {loadingSimilar && <Spinner />}
        </>
      )}

      <hr
        style={{
          height: "50px",
          border: "none",
          backgroundColor: "#333",
          marginBottom: "0",
        }}
      />
    </div>
  );
};

export default ShowPage;
