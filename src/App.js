import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

// Components
import Header from './components/elements/Header';
import HomePage from './pages/HomePage';

import MoviePage from './pages/MoviePage';
import MoviesPage from './pages/MoviesPage';

import ShowsPage from './pages/ShowsPage';
import ShowPage from './pages/ShowPage';
import ShowSeasonPage from './pages/ShowSeasonPage';

import ActorPage from './pages/ActorPage';

import NotFoundPage from './pages/NotFoundPage';

import { GlobalStyle } from './components/styles/GlobalStyle';

const App = () => (
    <Router>
        <Header />
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/movies/:movieId' component={MoviePage} />
            <Route exact path='/movies' component={MoviesPage} />

            <Route exact path='/shows' component={ShowsPage} />
            <Route exact path='/shows/:showId' component={ShowPage} />
            <Route exact path='/shows/:showId/season/:seasonNumber' component={ShowSeasonPage} />

            <Route exact path='/actors/:actorId' component={ActorPage} />

            <Route path="/404" component={NotFoundPage} />
            <Redirect to="/404" />
 
        </Switch>
        <GlobalStyle />
    </Router>
);

export default App;
