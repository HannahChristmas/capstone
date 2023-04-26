

import React, { useContext } from 'react';
import { UserContext } from '../UserContext';

function Interested({activities, userActivities, setUserActivities, interestedClick, selectedActivity, setSelectedActivity}) {
  const { user } = useContext(UserContext)


  const handleViewClick = () => {
    console.log("Clicked it")
    userActivities.map((activity) => {
      console.log(activity.id)
    })
  }

  const handleButtonClick = (activity) => {
    console.log("activity from Interested.js: ", activity)
  }

  if (user) {
    return (
      <>
        <div className="all-activities">
          <h1 onClick={handleViewClick}>I'm Interested</h1>
        </div>
        <div className="interested-activities-container">
          {userActivities.map((singleActivity) => {
            return (
              <div className="individual-activity" key={singleActivity.id}>
                <h2>{singleActivity.activity.title}</h2>
                <h3>{singleActivity.activity.neighborhood}</h3>
                <p>{singleActivity.activity.cost}</p>
                <p>{singleActivity.activity.address}</p>
                <button 
                  onClick={() => handleButtonClick(singleActivity)}
                >{singleActivity.interested ? "❤️" : "♡"}</button>
              </div>
            )
          })}
        </div>
      </>
    ) ;
  } else {
    return (
      <h2>Please log in or create account to see the places you've visited.</h2>
    )
  }
}

export default Interested;

