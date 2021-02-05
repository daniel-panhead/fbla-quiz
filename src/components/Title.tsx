import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import bcrypt from 'bcryptjs';
import {getUsers, addUser} from './DBData';
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
          value={username} onChange={(e) => setUsername(e.target.value)} autoFocus />
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

const Title: React.FC<{username: string; setUsername: (arg0: string) => void}> = ({username, setUsername}) => {

  const [mode, setMode] = useState("hidden");
  const [password, setPassword] = useState("");
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [error, setError] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  const history = useHistory();
  const handleLogin = (() => {
    setInvalidLogin(false);
    setAuthSuccess(false);
    setUsername("")
    setPassword("");
    setMode((mode=="login") ? "hidden" : "login")
  })
  const handleSignup = (() => {
    setInvalidLogin(false);
    setAuthSuccess(false);
    setUsername("")
    setPassword("");
    setMode((mode=="signup") ? "hidden" : "signup")
  })

  const onLogin = ((e: React.FormEvent) => {
    const getData = (async () => {
      e.preventDefault();
      console.log("Login")
      const {users} = await getUsers();
      const dbUser = users.find((user) => user.user == username)
      //user exists and correct password hash
      if(dbUser && await bcrypt.compare(password, dbUser.password)) {
          setInvalidLogin(false);
          setAuthSuccess(true);
          history.push('/dashboard');
      } else {
        setInvalidLogin(true);
      }
    })
    getData();
  })
  const onSignup = ((e: React.FormEvent) => {
    const getData = (async () => {
      e.preventDefault();
      const {users} = await getUsers();
      //if user exists already
      if(users.some((user) => user.user == username)) setInvalidLogin(true);
      //user doesn't exist
      else {
        try {
          const hashedPass = await bcrypt.hash(password, 10);
          await addUser(username, hashedPass);
          setInvalidLogin(false);
          setAuthSuccess(true);
        } catch(err) {
          console.error(err)
          return;
        }
      }
    })

    getData();
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
                      {(invalidLogin || error) &&
                        <p className="help is-danger">
                          {invalidLogin ? "Invalid username or password"
                          : error ? "Something went wrong. Please try again": "Something went wrong. Please try again"}
                        </p>
                      }
                      {authSuccess &&
                        <p className="help is-success">Login successful</p>
                      }
                      <input type="submit" className="button is-info" value="Log in" />
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
                    {(invalidLogin || error) &&
                      <p className="help is-danger">
                        {invalidLogin ? "Username already exists"
                        : error ? "Something went wrong. Please try again": "Something went wrong. Please try again"}
                      </p>
                    }
                    {authSuccess &&
                      <p className="help is-success">Username successfully added. Please login</p>
                    }
                    
                    <input type="submit" className="button is-info" value="Sign up" />
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