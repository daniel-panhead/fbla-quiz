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

const MC: React.FC<Props> = ({question, number, selected, setSelection, editable}) => {
  let counter = 0;
  const correct = question.answer==selected[`question${number}`]
  return (
    <>
      {!editable &&
        <CorrectAnswer question={question} number={number} selected={selected} />
      }
      <p id="question">{number}. {question.question}</p>
      {question.choices.map((choice) => {
        counter++;
        return(
          <label key={counter} className="radio">
            <input disabled={!editable} required type="radio" value={choice} name={"question"+number} checked={selected[`question${number}`]===choice} 
              onChange={e => setSelection({...selected, [`question${number}`]: e.target.value})} 
            />
            &nbsp;{choice}
          </label>
        )
      })}
    </>
  )
}

export default MC
