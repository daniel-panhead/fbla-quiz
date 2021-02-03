import React, { FormEvent, useState } from 'react';
import Question from './Question';
import Nav from './Nav';
import MC from './MC';
import FTB from './FTB';

interface Props {
  questions: {
    type: string;
    question: string;
    choices: string[];
    answer: string;
  }[]
}

const getRand = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max-min) + min);
}

const getQuestions = ({questions}: Props) => {
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
      //if questionArr does not contain randIndex
      //if questionArr does not contain the question type at questionArr[randIndex]
      // OR if at least 4 different types have already been reached
      if(uniqTypes >= 4 || !questionArr.some((question) => randIndex == question.index) &&
      !questionArr.some((q) => questions[randIndex].type == q.type)) {
        questionArr.push({
        type: questions[randIndex].type,
        index: randIndex
        });
        uniqTypes++;
        break;
      }
    }
  }
  //console.log(questionArr)
}

const Quiz: React.FC<Props> = ({questions}) => {
  getQuestions({questions});

  let counter = 0;

  const initialValues: {[key: string]: string} = {};

  for(let i = 1; i <= questions.length; i++) {
    initialValues[`question${i}` as any] = ""
  }

  const [selection, setSelection] = useState(initialValues);  

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(selection);
  }
  
  return (
    <>
      <Nav />

      <form onSubmit={handleSubmit} style={{padding: 10}}>
        <div className="block">
          <ol>
            {questions.map((question) => {
              counter++;

              //MCQ and TF questions have same structure
              if(question.type == "mc" || question.type == "tf") {
                return (
                  <Question key={counter} number={counter}>
                    <MC question={question} number={counter} selected={selection} setSelection={setSelection} />
                  </Question>
                )}
              if(question.type == "ftb") {
                return (
                  <Question key={counter} number={counter}>
                    <FTB question={question} number={counter} selected={selection} setSelection={setSelection} />
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
