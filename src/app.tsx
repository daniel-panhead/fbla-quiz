import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Title from './components/Title';
import Quiz from './components/Quiz';

import {questions} from './questions.json';


function render() {
  ReactDOM.render(
    <Router>
      <Switch>
        <Route path="/" exact>
          <Title />
        </Route>
        <Route path="/quiz">
          <Quiz questions={questions} />
        </Route>
      </Switch>
    </Router>
    ,document.getElementById('root'));
}

render();