import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import {getQuestions, getUsers, Props as DBProps} from './DBData';
interface Props {
  username: string;
  setUsername: (arg0: string) => void;
}

interface ResultProp {
  result: {
    questions: DBProps["questions"],
    selection: {}
  }[]
}

const ResultElement: React.FC<ResultProp> = (({result}) => {
  return (
    <>
    
    </>
  )
})

const Dashboard: React.FC<Props> = ({username, setUsername}) => {

  const[results, setResults] = useState<ResultProp["result"]>();

  useEffect(() => {
    const getAsync = (async () => {
      const currentUser = (await getUsers()).users.find(user => user.user == username);
      if(currentUser && currentUser.results) {
        const userResults = currentUser.results;
        const allQuestions = await getQuestions();
        const locResults = userResults.map((result) => {
          const questions = result.questionIndexes.map((questionIndex) => allQuestions[questionIndex]);
          return {
            questions: questions,
            selection: result.selection
          }
        })
        setResults(locResults);
      }
    })
    getAsync();
  }, [])

  //run once results are fetched and set
  useEffect(() => {
    //will be triggered on init, so ignore the first time results is set
    if(results) {
      console.log(results)
    }
    
  }, [results])

  return (
    <>
      <Nav username={username} setUsername={setUsername} />
      <section className="section">
        <div className="block">
          <h1 className="title is-1">Welcome back, {username}!</h1>
        </div>
        <div className="block">
          <button className="button is-info">Manage account</button>
        </div>
        <div className="block">
          {!results &&
            //loading animation
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          }
          {results && 
            results.map((result) => {
              
            })
          }
        </div>
        <div className="block">
          <Link to="/quiz" className="button is-success">Start quiz!</Link>
        </div>
      </section>
      
    </>
  )
}

export default Dashboard
