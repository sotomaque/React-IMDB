import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Header from './elements/Header';
import Home from './Home';
import MovieInfo from './Movie'

import { GlobalStyle } from './styles/GlobalStyle';

const App = () => (
    <Router>
        <Header />
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/movie/:movieId' component={MovieInfo} />
        </Switch>
        <GlobalStyle />
    </Router>
);

export default App;
