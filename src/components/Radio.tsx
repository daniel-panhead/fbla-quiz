import React from 'react'

interface Props {
  choiceName: string;
  questionNumber: number;
}

const Radio: React.FC<Props> = ({ choiceName, questionNumber }) => {
  return (
    <label className="radio">
      <input type="radio" name={"question"+questionNumber} ref={}/> {choiceName}
    </label>
  )
}

export default Radio
