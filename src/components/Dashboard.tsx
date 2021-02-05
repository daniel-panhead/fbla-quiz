import React from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'

interface Props {
  username: string;
  setUsername: (arg0: string) => void;
}

const Dashboard: React.FC<Props> = ({username, setUsername}) => {
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
          <Link to="/quiz" className="button is-success">Start quiz!</Link>
        </div>
      </section>
      
    </>
  )
}

export default Dashboard
