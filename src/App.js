import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Header from './components/Navigation/Header';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import MoviesPage from './pages/MoviesPage';
import ShowsPage from './pages/ShowsPage';
import ShowPage from './pages/ShowPage';
import ShowSeasonPage from './pages/ShowSeasonPage';
import GenreMoviesPage from './pages/GenreMoviesPage';
import GenreShowsPage from './pages/GenreShowsPage';
import ActorPage from './pages/ActorPage';
import ActorsPage from './pages/ActorsPage';
import NotFoundPage from './pages/NotFoundPage';

import { GlobalStyle } from './components/styles/GlobalStyle';

const App = () => (
    <Router>
        <Header />
        <Switch>
            <Route exact path='/React-IMDB' component={HomePage} />
            <Route exact path='/React-IMDB/movies/:movieId' component={MoviePage} />
            <Route exact path='/React-IMDB/movies' component={MoviesPage} />
            <Route exact path='/React-IMDB/movies/genre/:genreName/:genreId' component={GenreMoviesPage} />

            <Route exact path='/React-IMDB/shows' component={ShowsPage} />
            <Route exact path='/React-IMDB/shows/:showId' component={ShowPage} />
            <Route exact path='/React-IMDB/shows/:showId/season/:seasonNumber' component={ShowSeasonPage} />
            <Route exact path='/React-IMDB/shows/genre/:genreName/:genreId' component={GenreShowsPage} />

            <Route exact path='/React-IMDB/people/:actorId' component={ActorPage} />
            <Route exact path='/React-IMDB/people' component={ActorsPage} />
            

            <Route path="/React-IMDB/404" component={NotFoundPage} />            
            <Route path="*" component={NotFoundPage} />
 
        </Switch>
        <GlobalStyle />
    </Router>
);

export default App;
