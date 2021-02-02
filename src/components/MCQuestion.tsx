import React from 'react'
import Radio from './Radio'

interface Props {
  question: {
    answer: string;
    choices: string[];
    question: string;
    type: string
  };
  number: number
}

const MCQuestion: React.FC<Props> = (({question, number}) => {
  return (
    <div>
      <div className="box" style={{backgroundColor: number%2==0 ? "azure" : "white"}}>
        <p id="text">{number}. {question.question}</p>
        {question.choices.map((choice) => {
          return(
            <label className="radio">
              <input type="radio" value={choice} name={"question"+number} /> {choice}
            </label>
          )})}
      </div>
    </div>
  )
})

export default MCQuestion
