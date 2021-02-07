import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Nav from './Nav'
import {getQuestions, getUsers, delResult, Props as DBProps} from './DBData';
interface Props {
  username: string;
  setUsername: (arg0: string) => void;
  setRandQuestions: ({}) => void;
  setSelection: ({}) => void;
}

interface ResultProp {
  username: string;
  result: {
    questions: DBProps["questions"],
    selection: {},
    startTime: number,
    score: number
  }[];
  resultIndex: number;
  resultsArr: ResultProp["result"];
  setRandQuestions: ({}) => void;
  setSelection: ({}) => void;
  setDelError: (arg0: boolean) => void;
  setResults: (arg0: ResultProp["result"]) => void;
}

const ResultElement: React.FC<ResultProp> = (({username, result, resultIndex, setRandQuestions, setSelection, setDelError, resultsArr, setResults}) => {

  //lol
  const resultElement = result[0];
  const history = useHistory();
  const resultHandler = (() => {
    setRandQuestions(resultElement.questions);
    setSelection(resultElement.selection);
    history.push("/review");
  })
  
  const deleteHandler = (() => {
    const delAsync = (async () => {
      try {
        await delResult(username, resultElement.startTime);
        let newResultsArr = (resultsArr.slice(0, resultIndex)).concat(resultsArr.slice(resultIndex+1, resultsArr.length))
        setResults(newResultsArr);
      } catch(error) {
        setDelError(true);
      }
    })
    delAsync();
  })


  const startTime = new Date(resultElement.startTime);
  return (
    <div className="card">
      <div className="card-content">
        <p><b>Score: {(resultElement.score * 100).toFixed(2)}%</b></p>
        <p style={{color: "gray"}}>Taken on {`${startTime}`}</p>
      </div>
      <div className="card-footer">
        <a onClick={resultHandler} className="card-footer-item">View</a>
        <a onClick={deleteHandler} className="card-footer-item">Delete</a>
      </div>
    </div>
  )
})

const Dashboard: React.FC<Props> = ({username, setUsername, setRandQuestions, setSelection}) => {

  const [results, setResults] = useState<ResultProp["result"]>();
  const [delError, setDelError] = useState(false);

  useEffect(() => {
    const getAsync = (async () => {
      const currentUser = (await getUsers()).users.find(user => user.user == username);
      if(currentUser) {
        if(currentUser.results) {
          const userResults = currentUser.results;
          const allQuestions = await getQuestions();
          const locResults = userResults.map((result) => {
            const questions = result.questionIndexes.map((questionIndex) => allQuestions[questionIndex]);
            return {
              questions: questions,
              selection: result.selection,
              startTime: result.startTime,
              score: result.score
            }
          })
          setResults(locResults);
        } else {
          setResults([]);
        }
      }
    })
    getAsync();
  }, [])

  return (
    <>
      <Nav username={username} setUsername={setUsername} />
      <section className="section">
        <div className="block">
          <h1 className="title is-1">Welcome back, {username}!</h1>
        </div>
        <div className="block">
          <div className="buttons">
            <button className="button is-info">Manage account</button>
            <Link to="/quiz" className="button is-success">Start quiz!</Link>
          </div>
          
        </div>
        <div className="block">
          <h1 className="subtitle">Previous Results</h1>
          {!results &&
            //loading animation
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          }
          {results && 
            (results.length > 0) ? 
            results.map((result, index) => {
              return (
                <div key={index} className="block">
                  <ResultElement username={username} result={[result]} resultIndex={index} resultsArr={results} setResults={setResults} setRandQuestions={setRandQuestions} setSelection={setSelection} setDelError={setDelError} />
                  {delError &&
                    <p className="help is-danger">An error occurred while deleting. Please try again</p>
                  }
                </div>
              )
            })
            : <p style={{color: 'grey'}}>No previous quiz results found. Click the "Start quiz!" button to start a new quiz</p>
          }
        </div>
      </section>
      
    </>
  )
}

export default Dashboard
