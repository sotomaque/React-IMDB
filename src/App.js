import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Header from './components/elements/Header';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import MoviesPage from './pages/MoviesPage';
import ShowPage from './pages/ShowPage';
import ActorPage from './pages/ActorPage';

import { GlobalStyle } from './components/styles/GlobalStyle';

const App = () => (
    <Router>
        <Header />
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/movie/:movieId' component={MoviePage} />
            <Route exact path='/movie' component={MoviesPage} />
            <Route exact path='/show/:showId' component={ShowPage} />
            <Route exact path='/actor/:actorId' component={ActorPage} />
        </Switch>
        <GlobalStyle />
    </Router>
);

export default App;
