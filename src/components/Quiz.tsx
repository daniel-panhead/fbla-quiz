import React, { FormEvent } from 'react';
import MCQuestion from './MCQuestion';
import Nav from './Nav';

interface Props {
  questions: {
    type: string;
    question: string;
    choices: string[];
    answer: string;
  }[]
}

const Quiz: React.FC<Props> = ({questions}) => {

  let counter = 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <>
      <Nav />

      <form onSubmit={handleSubmit}>
        <div className="block">
          <ol>
            {questions.map((question) => {
              counter++;
              if(question.type == "mc") {
                return (
                  <div className="block">
                    <li>
                      <MCQuestion question={question} number={counter} />
                    </li>
                  </div>
                )}
            })}
          </ol>
        </div>
        <input type="submit" className="button is-link" value="Submit" />
      </form>
    </>
  )
}

export default Quiz
