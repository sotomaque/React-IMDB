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
import GenrePage from './pages/GenrePage';
import ActorPage from './pages/ActorPage';
import NotFoundPage from './pages/NotFoundPage';

import { GlobalStyle } from './components/styles/GlobalStyle';

const App = () => (
    <Router>
        <Header />
        <Switch>
            <Route exact path='/React-IMDB' component={HomePage} />
            <Route exact path='/React-IMDB/movies/:movieId' component={MoviePage} />
            <Route exact path='/React-IMDB/movies' component={MoviesPage} />

            <Route exact path='/React-IMDB/genre/:genreName/:genreId' component={GenrePage} />

            <Route exact path='/React-IMDB/shows' component={ShowsPage} />
            <Route exact path='/React-IMDB/shows/:showId' component={ShowPage} />
            <Route exact path='/React-IMDB/shows/:showId/season/:seasonNumber' component={ShowSeasonPage} />

            <Route exact path='/React-IMDB/people/:actorId' component={ActorPage} />

            <Route path="/React-IMDB/404" component={NotFoundPage} />
            <Route path="*" component={NotFoundPage} />
 
        </Switch>
        <GlobalStyle />
    </Router>
);

export default App;
