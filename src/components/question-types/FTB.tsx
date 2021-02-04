import React from 'react'
import CorrectAnswer from '../CorrectAnswer';
interface Props {
  question: {
    answer: string;
    choices: string[];
    question: string;
    type: string
  };
  number: number;
  selected: {
    [key: string]: string;
  };
  setSelection: ({}) => void;
  editable: boolean;
}

const FTB: React.FC<Props> = ({question, number, selected, setSelection, editable}) => {
  let questionSplit = question.question.split("_");
  return (
    <>
      {!editable &&
        <CorrectAnswer question={question} number={number} selected={selected} />
      }
      <label id="question">
        {number}. {questionSplit[0]}
        <input disabled={!editable} required pattern="[A-Za-z\s]+" title="Alphabetic characters only" type="text" className="text" value={selected[`question${number}`]} 
          onChange={e => setSelection({...selected, [`question${number}`]: e.target.value})} 
        />
        {questionSplit[1]}
      </label>
    </>
  )
}

export default FTB
