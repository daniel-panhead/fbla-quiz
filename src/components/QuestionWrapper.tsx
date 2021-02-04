import React from 'react'
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
  setSelection: ({}) => void;
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

const Score: React.FC<{questions: Props["questions"], selection: Props["selection"]}> = (({questions, selection}) => {
  let score = calculateScore(questions, selection);
  let total = Object.keys(selection).length
  let percent = (score/total)*100
  return (
    <>
      <h1 className="title">Score: {percent}% ({score}/{total})</h1>
    </>
  )
})

const QuestionWrapper: React.FC<Props> = ({questions, selection, setSelection, mode}) => {
  const editable = (mode=="quiz") ? true : false;

  let counter = 0;
  return (
    <div>
      
      <div>
      {!editable &&
        <Score questions={questions} selection={selection}/>
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
  mode: "quiz"
}
export default QuestionWrapper
