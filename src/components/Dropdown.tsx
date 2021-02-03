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

const Dropdown: React.FC<Props> = ({question, number, selected, setSelection}) => {
  let counter = 0;
  let questionSplit = question.question.split("_");
  return (
    <>
      <label id="question">
        {number}. {questionSplit[0]}
        <select name={"question"+number} value={selected[`question${number}`]}
          onChange={e => setSelection({...selected, [`question${number}`]: e.target.value})}
        >
          <option value="">--Select one--</option>
          {question.choices.map((choice) => {
            counter++;
            return(     
              <option key={counter} value={choice}>{choice}</option>
            )
          })}
        </select>
        {questionSplit[1]}
      </label>
    </>
  )
}

export default Dropdown