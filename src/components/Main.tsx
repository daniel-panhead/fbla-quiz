import React from 'react'
import { useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Title from './Title';
import Quiz from './Quiz';
import Result from './Result';


import {getQuestions, getInitialVals, Props} from './GetQuestions';


const Main = () => {

  //initialize random questions state
  const [randQuestions, setRandQuestions] = useState<Props["questions"]>(getQuestions());
  //create state that holds values of selected questions
  const [selection, setSelection] = useState(getInitialVals(randQuestions));

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Title />
        </Route>
        <Route path="/quiz">
          <Quiz questions={randQuestions} setRandQuestions={setRandQuestions} setSelection={setSelection} selection={selection}/>
        </Route>
        <Route path="/result">
          <Result questions={randQuestions} selection={selection} setSelection={setSelection} />
        </Route>
      </Switch>
    </Router>
  )
}

export default Main
