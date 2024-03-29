import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState} from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import Help from './Help';
const logo = require('../../assets/fbla-logo-2.png')

const Nav: React.FC<{username: string; setUsername: (arg0: string) => void;}> = ({username, setUsername}) => {
  
  const history = useHistory();
  const handleLogout = (() => {
    setUsername("");
    history.push("/");
  })

  const [helpActive, setHelpActive] = useState(false);

  return (
    <>
      <nav className="navbar is-light no-print">
        <div className="navbar-brand">
          <span className="navbar-item">
            <img src={logo} alt="FBLA logo" />
          </span>
          <Link to="/dashboard" className="navbar-item">Back to dashboard</Link>
          <span className="navbar-item">
            <a onClick={() => setHelpActive(true)} className="help-icon"><FontAwesomeIcon icon="question-circle"/></a>
          </span>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            <h1 className="navbar-item">Logged in as&nbsp;<b>{username}</b></h1>
            <div className="navbar-item" style={{marginRight: "2em"}}>
              <button className="button is-warning" onClick={handleLogout} >Log out</button>
            </div>
          </div>
        </div>
      </nav>
      <Help helpActive={helpActive} setHelpActive={setHelpActive} />
    </>
  )
}

export default Nav
