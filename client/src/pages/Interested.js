import React, { useContext } from 'react';
import { UserContext } from '../UserContext';

function Interested({activities}) {


  
    const {user} = useContext(UserContext)
    const userInterests = user && user.user_activities ? user.user_activities : [];
    

    if (!user) {
      return <p>Profile loading...</p>
    }

    if (user) {
    return (
      <>
        <div className="all-activities">
          <h1>I'm Interested</h1>
          {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
        </div>


        <div className="interested-activities-container">
          {userInterests.map((interest) => (
            <div key={interest.id} className="individual-activity">
              <h1>{interest.user_id}</h1>
              <h2>{interest.activity_id}</h2>
              <h4>{interest.visited}</h4>
              <h4>{interest.interested}</h4>

            </div>          
          ))}
        </div>

        <div id="login-footer">
          {/* <img id="footer-image" src="https://i.ibb.co/qFPpqCQ/skyline3.png" alt="skyline"/> */}
        </div>
      </>
      );
  
  }
}

export default Interested;
