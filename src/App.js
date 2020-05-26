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
import { theme } from './components/styles/Theme';

import { ThemeProvider } from '@material-ui/core/styles';


import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';

const App = () => (
    <ThemeProvider theme={theme}>
        <Router>
            <Header />
            <Switch>
                <Route exact path='/' component={HomePage} />

                <Route path='/register' component={RegistrationPage} />
                <Route path='/login' component={LoginPage} />


                <Route exact path='/movies/:movieId' component={MoviePage} />
                <Route exact path='/movies' component={MoviesPage} />
                <Route exact path='/movies/genre/:genreName/:genreId' component={GenreMoviesPage} />

                <Route exact path='/shows' component={ShowsPage} />
                <Route exact path='/shows/:showId' component={ShowPage} />
                <Route exact path='/shows/:showId/season/:seasonNumber' component={ShowSeasonPage} />
                <Route exact path='/shows/genre/:genreName/:genreId' component={GenreShowsPage} />

                <Route exact path='/people/:actorId' component={ActorPage} />
                <Route exact path='/people' component={ActorsPage} />

                <Route path="/404" component={NotFoundPage} />            
                <Route path="*" component={NotFoundPage} />
    
            </Switch>
            <GlobalStyle />
        </Router>
    </ThemeProvider>
    
);

export default App;
