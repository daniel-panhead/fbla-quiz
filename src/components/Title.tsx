import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import bcrypt from 'bcryptjs';
import {getUsers, addUser} from './DBData';
const image =  require('../../assets/fbla-logo.png');

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
          <input className="input" pattern="[A-Za-z0-9._-]+" title="Only alphanumeric characters, dots(.), underscores(_), and dashes(-) allowed" type="text" name="username" placeholder="Username" 
          value={username} onChange={(e) => setUsername(e.target.value)} autoFocus required />
        </div>
      </div>
      <div className="field">
        <div className="control has-icons-left">
          <span className="icon">
            <FontAwesomeIcon icon="key" />
          </span>
          <input className="input" pattern="[A-Za-z0-9._-]+" title="Only alphanumeric characters, dots(.), underscores(_), and dashes(-) allowed" type="password" name="password" placeholder="Password" 
          value={password} onChange={(e) => setPassword(e.target.value)} required />
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
  const [showSignupNotif, setShowSignupNotif] = useState(true);

  const history = useHistory();
  //user clicks login button; show the login form
  const handleLogin = (() => {
    setInvalidLogin(false);
    setAuthSuccess(false);
    setUsername("")
    setPassword("");
    setMode((mode=="login") ? "hidden" : "login")
  })
  //user clicks signup button; show the signup form
  const handleSignup = (() => {
    setInvalidLogin(false);
    setAuthSuccess(false);
    setUsername("")
    setPassword("");
    setShowSignupNotif(true);
    setMode((mode=="signup") ? "hidden" : "signup")
  })

  //login form submitted
  const onLogin = ((e: React.FormEvent) => {
    const getData = (async () => {
      e.preventDefault();
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
  //signup form submitted
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
          setError(true)
          return;
        }
      }
    })

    getData();
  })

  const deleteNotification = (() => {
    setShowSignupNotif(false);
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
              <button id="signup" onClick={handleSignup} className="button is-success">New User</button>
              &nbsp;
              <button id="login" onClick={handleLogin} className="button is-link">Returning User</button>   
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
            <>
              {showSignupNotif && 
                <div className="notification is-info" style={{margin: "1em 10em"}}>
                  <button className="delete" onClick={deleteNotification}></button>
                  New user? Enter your desired username and password, then click "Sign up". Usernames and passwords can only contain alphanumeric characters, underscores, dots, and dashes.
                </div>
              }
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
            </>
          }
        </div>
    </div>
  )
}

export default Title