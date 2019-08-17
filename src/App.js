import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import PrimarySearchAppBar from './components/PrimarySearchAppBar';

import Home from './components/Home';
import MoviePage from './components/MoviePage';

const theme = createMuiTheme();

const resetBackground = () => {
  document.body.style = `background: #fff`;
};

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <PrimarySearchAppBar />

        <Switch>
          <Route
            path='/'
            exact
            render={() => {
              resetBackground();
              return <Home />;
            }}
          />
          <Route path='/movie/:id' component={MoviePage} />
          <Route
            render={() => {
              resetBackground();
              return (
                <h2 style={{ textAlign: 'center' }}>404 Page not found!</h2>
              );
            }}
          />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
