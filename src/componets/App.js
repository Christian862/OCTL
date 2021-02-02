import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';

import MainNav from './MainNav';
import BoardView from './BoardView';
import BoardCreate from './Boards/BoardCreate';

const App = () => {
  return (
    <div>
      <Router history={history}>
        <MainNav />
        <Switch>
          <Route path="/:id" exact component={BoardView} />
          <Route path="/board/new" exact component={BoardCreate} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
