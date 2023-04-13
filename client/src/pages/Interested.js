import React, { useContext } from 'react';
import { UserContext } from '../UserContext';

function Interested({activities}) {
  
    const {user, setUser} = useContext(UserContext)
    if (user) {
    return (
      <>
        <div className="all-activities">
          <h1>I'm Interested</h1>
          <h2>HOME- from video</h2>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
        <div id="login-footer">
          {/* <img id="footer-image" src="https://i.ibb.co/qFPpqCQ/skyline3.png" alt="skyline"/> */}
        </div>
   </>
  );
} else {
  return (
    <h2>Please log in or create account to save your interests</h2>
  )
  }
}

export default Interested;
