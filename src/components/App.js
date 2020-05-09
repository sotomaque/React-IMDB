import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Header from './elements/Header';
import HomePage from './HomePage';
import MoviePage from './MoviePage';
import MoviesPage from './MoviesPage';
import ShowPage from './ShowPage';
import ActorPage from './ActorPage';

import { GlobalStyle } from './styles/GlobalStyle';

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
