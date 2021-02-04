import React from 'react'
import { Link } from 'react-router-dom'


const Nav: React.FC = () => {
  return (
    <nav className="navbar is-light no-print">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <img src={require('../images/fbla-logo-2.png')} alt="FBLA logo" />
        </Link>
        <Link to="/" className="navbar-item">Home</Link>
      </div>  
    </nav>
  )
}

export default Nav
