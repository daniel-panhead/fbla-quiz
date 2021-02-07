import React, { FormEvent, useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import Nav from './Nav';

import QuestionWrapper from './QuestionWrapper';
import {getRandQuestions, getInitialVals} from './DBData';
import Loading from './Loading';

interface Props {
  username: string;
  setUsername: (arg0: string) => void;
  questions: {
    type: string;
    question: string;
    choices: string[];
    answer: string;
  }[];
  selection: {[key: string]: string};
  setRandQuestions: ({}) => void;
  setSelection: ({}) => void;
  setRandQuestionIndexes: ([]) => void;
  setStartTime: (arg0: number) => void;
}

const Quiz: React.FC<Props> = ({username, setUsername, questions, selection, setRandQuestions, setSelection, setRandQuestionIndexes, setStartTime}) => {

  const [loading, setLoading] = useState(true);
  //only runs on page load; generates new questions and clear selections each time
  useEffect(() => {
    const fetchQuestions = (async () => {
      try {
        setLoading(true);
        const {questions, indexes} = await getRandQuestions();
        setRandQuestions(questions);
        setRandQuestionIndexes(indexes);
        setSelection(getInitialVals(questions));
        setLoading(false);
        setStartTime(Date.now());
      } catch(err) {
        setLoading(false);
        console.error(err);
      }
    })

    fetchQuestions();
  }, []); 
  
  //navigate to link on submit
  const history = useHistory();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    for(let i = 1; i <= Object.keys(selection).length; i++) {
      selection[`question${i}`] = selection[`question${i}`].trim();
    }
    history.push('/result');
  }

  if(loading) return (
    <>
      <Nav username={username} setUsername={setUsername} />
      <Loading />
    </>
  )
  return (
    <>
      <Nav username={username} setUsername={setUsername} />

      <form onSubmit={handleSubmit} style={{padding: 10}}>
        <div className="block" style={{margin: "1em 1em"}}>
          <QuestionWrapper questions={questions} selection={selection} setSelection={setSelection} />
        </div>
        <input type="submit" className="button is-link" value="Submit" />
      </form>
    </>
  )
}

export default Quiz
