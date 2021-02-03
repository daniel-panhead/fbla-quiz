import React from 'react'

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
}

const FTB: React.FC<Props> = ({question, number, selected, setSelection}) => {
  let questionSplit = question.question.split("_");
  return (
    <>
      <label id="question">
        {number}. {questionSplit[0]}
        <input type="text" className="text" value={selected[`question${number}`]} 
          onChange={e => setSelection({...selected, [`question${number}`]: e.target.value})} 
        />
        {questionSplit[1]}
      </label>
    </>
  )
}

export default FTB
