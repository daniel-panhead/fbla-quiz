import React, { useEffect } from 'react'
import Question from './Question';
import MC from './question-types/MC';
import FTB from './question-types/FTB';
import Dropdown from './question-types/Dropdown';

interface Props {
  questions: {
    type: string;
    question: string;
    choices: string[];
    answer: string;
  }[];
  selection: {[key: string]: string};
  setSelection?: ({}) => void;
  setScore?: (arg0: number) => void;
  mode?: "quiz" | "result";
}

const calculateScore = (questions: Props['questions'], selection: Props['selection']) => {
  let score = 0;
  let counter = 0;
  let answers: {[key: string]: string} = {};
  questions.forEach((question) => {
    counter++;
    answers[`question${counter}`] = question.answer.toLowerCase();
  });

  //loop over answers arr
  for(let i = 1; i <= Object.keys(answers).length; i++) {
    if(answers[`question${i}`] == selection[`question${i}`].toLowerCase()) score++;
  }
  return score;
}

const Score: React.FC<{questions: Props["questions"], selection: Props["selection"], setScore: Props["setScore"]}> = (({questions, selection, setScore}) => {
  let score = calculateScore(questions, selection);
  let total = Object.keys(selection).length
  let percent = ((score/total)*100).toFixed(2);
  //can't set states while stuff is rendering
  useEffect(() => {
    //cool rounding
    setScore(Math.round(((score/total) + Number.EPSILON) * 100) / 100);
  }, [])
  
  return (
    <>
      <h1 className="title">Score: {percent}% ({score}/{total})</h1>
    </>
  )
})

const QuestionWrapper: React.FC<Props> = ({questions, selection, setSelection, setScore, mode}) => {
  const editable = (mode=="quiz") ? true : false;
  let counter = 0;
  return (
    <div>
      
      <div>
      {!editable &&
        <Score questions={questions} selection={selection} setScore={setScore} />
      }
        <ol>
          {questions.map((question) => {
            counter++;

            //MCQ and TF questions have same structure
            if(question.type == "mc" || question.type == "tf") {
              return (
                <Question key={counter} number={counter}>
                  <MC question={question} number={counter} selected={selection} setSelection={setSelection} editable={editable} />
                </Question>
              )
            }
            if(question.type == "ftb") {
              return (
                <Question key={counter} number={counter}>
                  <FTB question={question} number={counter} selected={selection} setSelection={setSelection} editable={editable}/>
                </Question>
              )
            }
            if(question.type == "dropdown") {
              return (
                <Question key={counter} number={counter}>
                  <Dropdown question={question} number={counter} selected={selection} setSelection={setSelection} editable={editable}/>
                </Question>
              )
            }
          })}
        </ol>
      </div>
    </div>
  )
}

QuestionWrapper.defaultProps = {
  mode: "quiz",
  setSelection: (selection) => {}, //if we are in display mode don't let the selection be changed
  setScore: (score) => {}
}
export default QuestionWrapper
