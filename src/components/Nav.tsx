import React from 'react'
import { Link, useHistory } from 'react-router-dom'
const image = require('../../assets/fbla-logo-2.png')

const Nav: React.FC<{username: string; setUsername: (arg0: string) => void;}> = ({username, setUsername}) => {
  
  const history = useHistory();
  const handleLogout = (() => {
    setUsername("");
    history.push("/");
  })

  return (
    <nav className="navbar is-light no-print">
      <div className="navbar-brand">
        <span className="navbar-item">
          <img src={image} alt="FBLA logo" />
        </span>
        <Link to="/dashboard" className="navbar-item">Back to dashboard</Link>
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
  )
}

export default Nav
