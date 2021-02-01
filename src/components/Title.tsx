import React from 'react';
import {Link} from 'react-router-dom';

const Title: React.FC = () => {
  return (
    <div>
      <section className="section">
        <div className="block">
          <div className="level">
            <div className="level-item">
            <img src={require('../images/fbla-logo.png')} alt="FBLA logo" width="256" height="256" />
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
              <Link to="/quiz">
                <button id="startBtn" className="button is-link">Start the quiz</button></Link>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Title
