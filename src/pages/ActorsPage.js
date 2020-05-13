import React from "react";
import uuid from 'react-uuid';

// API CONSTANTS
import {
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  SEARCH_PEOPLE_BASE_URL,
  POPULAR_BASE_URL_PEOPLE,
} from "../config";

// Components
import CrewMember from "../components/People/CrewMember";
import SearchBar from "../components/elements/SearchBar";
import Grid from "../components/elements/Grid";
import LoadMoreButton from "../components/elements/LoadMoreButton";
import Spinner from "../components/elements/Spinner";
import HeroImage from "../components/elements/HeroImage";

// Hooks
import { usePopularPeopleFetch } from "../hooks/usePopularPeopleFetch";
import { usePopularMoviesFetch } from "../hooks/usePopularMoviesFetch";

const ActorsPage = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const [{ state: { heroImage } }] = usePopularMoviesFetch();
  const [{ state: { people, currentPage, totalPages }, loading, error}, fetchPopularPeople] = usePopularPeopleFetch();

  if (!people[0] || loading || !heroImage) return <Spinner />;
  if (error) return <div>Something went wrong...</div>;

  const searchPeople = (search) => {
    const endpoint = search
      ? SEARCH_PEOPLE_BASE_URL + search
      : POPULAR_BASE_URL_PEOPLE;
    setSearchTerm(search);
    fetchPopularPeople(endpoint);
  };

  const loadMorePeople = () => {
      const searchEndpoint = `${SEARCH_PEOPLE_BASE_URL}${searchTerm}&page=${currentPage + 1}`;
      const popularEndpoint = `${POPULAR_BASE_URL_PEOPLE}&page=${currentPage + 1}`;
      const endpoint = searchTerm ? searchEndpoint : popularEndpoint;
      fetchPopularPeople(endpoint)
  }

  const heroImageURL = `${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`;
  const heroImageTitle = heroImage.title;
  const heroImageText = heroImage.overview;

  return (
    <div style={{ paddingTop: "50px" }}>
      {!searchTerm && (
        <HeroImage
          image={heroImageURL}
          title={heroImageTitle}
          text={heroImageText}
        />
      )}
      <SearchBar title="Seach People..." callback={searchPeople} />
      <Grid header={searchTerm ? searchTerm : "Popular People"}>
        {people.map((member) => (
          <CrewMember key={uuid()} member={member} clickable />
        ))}
      </Grid>
      {loading && <Spinner />}
      {currentPage < totalPages && !loading && (
        <LoadMoreButton text="Load More" callback={loadMorePeople} />
      )}
      <hr style={{ height: "50px", border: "none", backgroundColor: "#333" }} />
    </div>
  );
};

export default ActorsPage;
