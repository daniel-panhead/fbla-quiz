import React, { FormEvent, useState } from 'react';
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

  const initialValues: {[key: string]: string} = {};

  for(let i = 1; i <= questions.length; i++) {
    initialValues[`question${i}` as any] = ""
  }
  initialValues[`question5`] = ""

  const [selection, setSelection] = useState(initialValues);
  

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(selection);
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
                      <MCQuestion question={question} number={counter} selected={selection} 
                        setSelection={setSelection}/>
                    </li>
                  </div>
                )}
            })}
            <li>
              <div className="box" style={{backgroundColor: "white"}}>
                <p id="text">5. Is this true or false?</p>
                <label className="radio">
                  <input type="radio" value="True" checked={selection.question5 === "True"} 
                    onChange={e => setSelection({...selection, [`question5`]: e.target.value})} name="question5" /> True
                </label>
                <label className="radio">
                  <input type="radio" value="False" checked={selection.question5 === "False"} 
                    onChange={e => setSelection({...selection, [`question5`]: e.target.value})} name="question5" /> False
                </label>
              </div>
            </li>
          </ol>
        </div>
        <input type="submit" className="button is-link" value="Submit" />
      </form>
    </>
  )
}

export default Quiz
