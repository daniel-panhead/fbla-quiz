import React, { FormEvent, useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import Nav from './Nav';

import QuestionWrapper from './QuestionWrapper';
import {getQuestions, getInitialVals} from './DBData';
import Loading from './Loading';

interface Props {
  questions: {
    type: string;
    question: string;
    choices: string[];
    answer: string;
  }[];
  selection: {[key: string]: string};
  setRandQuestions: ({}) => void;
  setSelection: ({}) => void;
}

const Quiz: React.FC<Props> = ({questions, selection, setRandQuestions, setSelection}) => {

  const [loading, setLoading] = useState(true);
  //only runs on page load; generates new questions and clear selections each time
  useEffect(() => {
    const fetchQuestions = (async () => {
      try {
        setLoading(true);
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
  
  //navigate to link on submit
  const history = useHistory();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    for(let i = 1; i <= Object.keys(selection).length; i++) {
      selection[`question${i}`] = selection[`question${i}`].trim();
    }
    console.log(selection);
    history.push('/result');
  }

  if(loading) return (
    <>
      <Nav />
      <Loading />
    </>
  )
  return (
    <>
      <Nav />

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
