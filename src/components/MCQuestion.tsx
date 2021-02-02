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

const MCQuestion: React.FC<Props> = (({question, number, selected, setSelection}) => {
  return (
    <div>
      <div className="box" style={{backgroundColor: number%2==0 ? "azure" : "white"}}>
        <p id="text">{number}. {question.question}</p>
        {question.choices.map((choice) => {
          console.log(number)
          return(
            <label className="radio">
              <input type="radio" value={choice} name={"question"+number} checked={selected[`question${number}`]===choice} 
                onChange={e => setSelection({...selected, [`question${number}`]: e.target.value})} /> {choice}
            </label>
          )})}
      </div>
    </div>
  )
})

export default MCQuestion
