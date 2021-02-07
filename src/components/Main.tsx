import React from 'react'
import { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import {ipcRenderer} from 'electron';
import {getRandQuestions, getInitialVals, getUsers, Props} from './DBData';
import Title from './Title';
import Quiz from './Quiz';
import Result from './Result';
import Loading from './Loading'
import Dashboard from './Dashboard';



const Main = () => {

  const [username, setUsername] = useState("");
  //initialize random questions state
  const [randQuestions, setRandQuestions] = useState<Props["questions"]>();
  //hold indexes of rand questions for saving
  const [randQuestionIndexes, setRandQuestionIndexes] = useState<number[] | null>([]);
  //create state that holds values of user selections
  const [selection, setSelection] = useState<{[key: string]: string}>();
  //quiz start time
  const [startTime, setStartTime] = useState(0);
  //loading state
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchQuestions = (async () => {
      try {
        setLoading(true);
        await ipcRenderer.invoke('get-db');
        const {questions, indexes} = await getRandQuestions();
        setRandQuestions(questions);
        setRandQuestionIndexes(indexes);
        setSelection(getInitialVals(questions));
        setLoading(false);
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
          <Quiz username={username} setUsername={setUsername} questions={randQuestions} setRandQuestions={setRandQuestions} 
          setSelection={setSelection} selection={selection} setRandQuestionIndexes={setRandQuestionIndexes} setStartTime={setStartTime} />
        </Route>
        <Route path="/result">
          <Result username={username} setUsername={setUsername} questions={randQuestions} selection={selection} 
          startTime={startTime} randQuestionIndexes={randQuestionIndexes} />
        </Route>
        <Route path="/review">
          <Result username={username} setUsername={setUsername} questions={randQuestions} selection={selection} />
        </Route>
        <Route path="/dashboard">
          <Dashboard username={username} setUsername={setUsername} setRandQuestions={setRandQuestions} setSelection={setSelection} />
        </Route>
      </Switch>
    </Router>
  )
}

export default Main
