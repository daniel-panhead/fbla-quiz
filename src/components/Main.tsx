import React from 'react'
import { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import {ipcRenderer} from 'electron';
import {getQuestions, getInitialVals, getUsers, Props} from './DBData';
import Title from './Title';
import Quiz from './Quiz';
import Result from './Result';
import Loading from './Loading'
import Dashboard from './Dashboard';



const Main = () => {

  const [username, setUsername] = useState("");
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
        console.log("questions fetched")
      } catch(err) {
        setLoading(false);
        console.error(err);
      }
    })

    fetchQuestions();
  }, []);


  if(loading) return (
    <Loading />
  )
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Title username={username} setUsername={setUsername} />
        </Route>
        <Route path="/quiz">
          <Quiz username={username} setUsername={setUsername} questions={randQuestions} setRandQuestions={setRandQuestions} setSelection={setSelection} selection={selection}/>
        </Route>
        <Route path="/result">
          <Result username={username} setUsername={setUsername} questions={randQuestions} selection={selection} setSelection={setSelection} />
        </Route>
        <Route path="/dashboard">
          <Dashboard username={username} setUsername={setUsername} />
        </Route>
      </Switch>
    </Router>
  )
}

export default Main
