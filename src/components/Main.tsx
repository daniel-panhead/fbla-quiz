import React from 'react'
import { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import {ipcRenderer} from 'electron';
import Title from './Title';
import Quiz from './Quiz';
import Result from './Result';


import {getQuestions, getInitialVals, Props} from './GetQuestions';


const Main = () => {

  //initialize random questions state
  const [randQuestions, setRandQuestions] = useState<Props["questions"]>();
  //create state that holds values of selected questions
  const [selection, setSelection] = useState<{[key: string]: string}>();
  //loading state
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchQuestions = (async () => {
      try {
        setLoading(true);
        await ipcRenderer.invoke('get-db');
        const questions = await getQuestions();
        setRandQuestions(questions);
        setSelection(getInitialVals(questions));
        setLoading(false);
        console.log("done")
      } catch(err) {
        setLoading(false);
        console.error(err);
      }
    })

    fetchQuestions();
  }, []);


  if(loading) return (
    <h1 className="title">LOADING!!!</h1>
  )
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
