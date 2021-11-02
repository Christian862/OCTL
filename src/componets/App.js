import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';

import MainNav from './MainNav';
import PropertyView from './Properties/PropertyView';
import PropertyCreate from './Properties/PropertyCreate';
import PortfolioView from './Portfolio/PortfolioView';

const App = () => (
  <div id="app">
    <Router history={history}>
      <MainNav />
      <Switch>
        {/*  TODO CREATE PORTFOLIO PAGE */}
        <Route path="/" exact component={PortfolioView} />
        <Route path="/:id" exact component={PropertyView} />
        <Route path="/property/new" exact component={PropertyCreate} />
      </Switch>
    </Router>
  </div>
);

export default App;
