import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {getUsers, addUser} from './DBData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const image =  require('../images/fbla-logo.png');

interface UserProps {
  username: string;
  setUsername: (arg0: string) => void;
  password: string;
  setPassword: (arg0: string) => void;
}

const UserForm: React.FC<UserProps> = ({username, setUsername, password, setPassword}) => {
  return (
    <>
      <div className="field">
        <div className="control has-icons-left">
          <span className="icon">
            <FontAwesomeIcon icon="user" />
          </span>
          <input className="input" type="text" name="username" placeholder="Username" 
          value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
      </div>
      <div className="field">
        <div className="control has-icons-left">
          <span className="icon">
            <FontAwesomeIcon icon="key" />
          </span>
          <input className="input" type="password" name="password" placeholder="Password" 
          value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
      </div>
    </>
  )
}

const Title: React.FC = () => {

  const [mode, setMode] = useState("hidden");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const handleLogin = (() => {
    setUsername("")
    setPassword("");
    setMode((mode=="login") ? "hidden" : "login")
    //history.push('/quiz');
  })
  const handleSignup = (() => {
    setUsername("")
    setPassword("");
    setMode((mode=="signup") ? "hidden" : "signup")
  })

  const onLogin = ((e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login")
    console.log(username)
    console.log(password)
  })
  const onSignup = ((e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password")
    console.log(username)
    console.log(password)
  })

  return (
    <div>
      <section className="section">
        <div className="block">
          <div className="level">
            <div className="level-item">
            <img src={image} alt="FBLA logo" width="256" height="256" />
            </div>
          </div>
        </div>
      </section>
      <div className="block">
        <div className="level">
          <div className="level-item">
            <h1 className="title">Test your knowledge!</h1>
          </div>
        </div>
      </div>
      <div className="block">
          <div className="level">
            <div className="level-item">
                <button id="login" onClick={handleLogin} className="button is-success">Login</button>
                &nbsp;
                <button id="signup" onClick={handleSignup} className="button is-link">Signup</button>
            </div>
          </div>
          { mode == "login" && 
            <div className="level">
              <div className="level-item">
                <form onSubmit={onLogin}>
                  <UserForm username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
                  <div className="field">
                    <div className="control">
                      <p className="help is-danger">Invalid username or password</p>
                      <input type="submit" className="button is-link" value="Log in" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          }
          { mode == "signup" &&
            <div className="level">
              <div className="level-item">
                <form onSubmit={onSignup}>
                  <UserForm username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
                  <div className="field">
                    <div className="control">
                      <input type="submit" className="button is-link" value="Sign up" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          }
        </div>
    </div>
  )
}

export default Title