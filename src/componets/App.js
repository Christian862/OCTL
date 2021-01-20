import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';

import MainNav from './MainNav';
import BoardView from './BoardView';
import CreateBoard from './Boards/CreateBoard';

const App = () => {
  return (
    <div>
      <Router history={history}>
        <MainNav />
        <Switch>
          <Route path="/" exact component={BoardView} />
          <Route path="/board/new" exact component={CreateBoard} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
