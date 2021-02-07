import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Nav from './Nav'
import bcrypt from 'bcryptjs'
import {getQuestions, getUsers, delResult, delUser, changePasswd as dbChangePasswd, Props as DBProps} from './DBData';
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
  setDelResultError: (arg0: boolean) => void;
  setResults: (arg0: ResultProp["result"]) => void;
}

const ResultElement: React.FC<ResultProp> = (({username, result, resultIndex, setRandQuestions, setSelection, setDelResultError, resultsArr, setResults}) => {

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
        setDelResultError
    (true);
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
  const [delResultError, setDelResultError] = useState(false);
  const [delAcctError, setDelAcctError] = useState(false);
  const [delAcctConfirm , setDelAcctConfirm] = useState(false);
  const [changePasswd, setChangePasswd] = useState(false);
  const [passwdChanged, setPasswdChanged] = useState(false);
  const [passwdError, setPasswdError] = useState(false);
  const [oldPasswd, setOldPasswd] = useState("")
  const [newPasswd, setNewPasswd] = useState("")

  const handleChangePasswd = ((e: React.FormEvent) => {
    const getData = (async () => {
      e.preventDefault();
      const {users} = await getUsers();
      const dbUser = users.find((user) => user.user == username)
      //user exists and correct password hash
      if(dbUser && await bcrypt.compare(oldPasswd, dbUser.password)) {
        const hashedPass = await bcrypt.hash(newPasswd, 10);
        await dbChangePasswd(username, hashedPass);
        setPasswdChanged(true);
        setPasswdError(false);
      } else {
        setPasswdChanged(false);
        setPasswdError(true);
      }
    })
    getData();
  })
  const history = useHistory();
  const handleDelAcct = (() => {
    const delAcct = (async () => {
      try {
        await delUser(username);
        setUsername("");
        history.push("/");
      } catch(error) {
        console.error(error);
        setDelAcctError(true);
      }
      
    })
    delAcct();
  })

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
            <button onClick={() => setChangePasswd(!changePasswd)} className="button is-warning">Change Password</button>
            <button onClick={() => setDelAcctConfirm(!delAcctConfirm)} className="button is-danger">Delete Account</button>
            <Link to="/quiz" className="button is-success">Start quiz!</Link>
          </div>
          {delAcctConfirm &&
            <div>
              <button onClick={handleDelAcct} className="button is-danger is-light">Confirm Delete</button>
              {delAcctError &&
                <p className="help is-danger">An error occurred while deleting. Please try again</p>
              }
            </div>
          }
          {changePasswd &&
            <form className="form" onSubmit={handleChangePasswd}>
              <div className="field">
                <label>Old Password</label>
                <div className="control">
                  <input required type="password" className="text" name="currentPasswd" placeholder="Current Password" pattern="[A-Za-z0-9._-]+" title="Only alphanumeric characters, dots(.), underscores(_), and dashes(-) allowed"
                  onChange={(e) => setOldPasswd(e.target.value)} value={oldPasswd} />
                </div>
              </div>
              <div className="field">
              <label>New Password</label>
                <div className="control">
                  <input required type="password" className="text" name="newPasswd" placeholder="New Password" pattern="[A-Za-z0-9._-]+" title="Only alphanumeric characters, dots(.), underscores(_), and dashes(-) allowed"
                  onChange={(e) => setNewPasswd(e.target.value)} value={newPasswd} />
                </div>
              </div>
              <input type="submit" className="button is-info" value="Change Password" />
              {passwdError && 
                <p className="help is-danger">An error occurred. Make sure your password is correct</p>
              }
              {passwdChanged &&
                <p className="help is-success">Password successfully changed</p>
              }
            </form>
          }

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
                  <ResultElement username={username} result={[result]} resultIndex={index} resultsArr={results} setResults={setResults} setRandQuestions={setRandQuestions} setSelection={setSelection} setDelResultError
              ={setDelResultError
              } />
                  {delResultError &&
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
