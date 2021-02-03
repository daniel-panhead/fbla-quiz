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

const MC: React.FC<Props> = ({question, number, selected, setSelection}) => {
  let counter = 0;
  return (
    <>
      <p id="question">{number}. {question.question}</p>
      {question.choices.map((choice) => {
        counter++;
        return(
          <label key={counter} className="radio">
            <input type="radio" value={choice} name={"question"+number} checked={selected[`question${number}`]===choice} 
              onChange={e => setSelection({...selected, [`question${number}`]: e.target.value})} 
            />
            {choice}
          </label>
        )
      })}
    </>
  )
}

export default MC
