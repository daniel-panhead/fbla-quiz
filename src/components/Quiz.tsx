import React, { FormEvent, useState, useEffect } from 'react';
import Nav from './Nav';

import Question from './Question';
import MC from './MC';
import FTB from './FTB';
import Dropdown from './Dropdown';

interface Props {
  questions: {
    type: string;
    question: string;
    choices: string[];
    answer: string;
  }[];
}

const getRand = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max-min) + min);
}

const getQuestions = (questions: Props["questions"]) => {
  let questionArr: {
    type: string;
    index: number
  }[] = []

  //let types = ["mc", "tf", "ftb", "dropdown"];
  let uniqTypes = 0;

  for(let i = 0; i < 5; i++) {
    while(true) {
      let randIndex = getRand(0, questions.length);

      //only add element at randIndex IF:
      //if questionArr does not contain randIndex (question has not already been selected) and
      //if questionArr does not contain the question type at questionArr[randIndex]
      //or if at least 4 different types have already been reached
      if(!questionArr.some((question) => randIndex == question.index) && 
      (uniqTypes >= 4 || !questionArr.some((q) => questions[randIndex].type == q.type))) {
        questionArr.push({
          type: questions[randIndex].type,
          index: randIndex
        });
        uniqTypes++;
        break;
      }
    }
  }
  const randQuestions = questionArr.map((question) => questions[question.index]);
  return(randQuestions)
}

const getInitialVals = ((questions: object[]) => {
  //generate initial array containing question props
  let initialValues: {[key: string]: string} = {};
  for(let i = 1; i <= questions.length; i++) {
    initialValues[`question${i}`] = ""
  }
  return initialValues
})

const Quiz: React.FC<Props> = ({questions}) => {

  //initialize random questions
  const [randQuestions, setRandQuestions] = useState<Props["questions"]>(getQuestions(questions));

  //only runs on page load; generates new questions each time
  useEffect(() => {
    setRandQuestions(getQuestions(questions))
  }, []);

  //create state that holds values of selected questions
  const [selection, setSelection] = useState(getInitialVals(randQuestions));  
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(selection);
  }

  let counter = 0;
  return (
    <>
      <Nav />

      <form onSubmit={handleSubmit} style={{padding: 10}}>
        <div className="block">
          <ol>
            {randQuestions.map((question) => {
              counter++;

              //MCQ and TF questions have same structure
              if(question.type == "mc" || question.type == "tf") {
                return (
                  <Question key={counter} number={counter}>
                    <MC question={question} number={counter} selected={selection} setSelection={setSelection} />
                  </Question>
                )
              }
              if(question.type == "ftb") {
                return (
                  <Question key={counter} number={counter}>
                    <FTB question={question} number={counter} selected={selection} setSelection={setSelection} />
                  </Question>
                )
              }
              if(question.type == "dropdown") {
                return (
                  <Question key={counter} number={counter}>
                    <Dropdown question={question} number={counter} selected={selection} setSelection={setSelection} />
                  </Question>
                )
              }
            })}
          </ol>
        </div>
        <input type="submit" className="button is-link" value="Submit" />
      </form>
    </>
  )
}

export default Quiz
