import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
}

const CorrectAnswer: React.FC<Props> = ({question, number, selected}) => {
  const correct = question.answer.toLowerCase()==selected[`question${number}`].toLowerCase()

  return (
    <div>
      <FontAwesomeIcon style={{color: correct ? "green" : "red"}} icon={correct ? "check" : "times-circle"} size="lg" />&nbsp;
      <b>{correct ? "Correct!" : "Wrong! Correct answer: " + question.answer}</b>
    </div>
  )
}

export default CorrectAnswer
