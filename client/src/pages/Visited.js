import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';

function Visited({activities, selectedActivity, setSelectedActivity, interestedClick}) {
  const [showVisitButton, setVisitButton] = useState(false);

  const {user} = useContext(UserContext)

  function viewClick(activity) {
    setSelectedActivity(activity)
    setVisitButton(true)
    console.log(activity)
  }


  if (user) {
    return (
      <>
        <div className="all-activities">
          <h1>I've Been Here</h1>
          <h2>{user.username}</h2>
        </div>
        <div className="interested-activities-container">
          {activities.map((activity) => {
            const userActivities = activity.user_activities.filter((userActivity) => {
              // filter only returns what you don't take out
              return userActivity.user_id === user?.id && userActivity.visited === true;
            });
            return userActivities.map((userActivity) => (
              <div key={activity.id} className="individual-activity">
                <h4>{activity.title}</h4>
                <h3>{activity.neighborhood}</h3>
                <p>${activity.cost}</p>
                <button onClick={() => viewClick(activity)}>View</button><br></br>
                  {selectedActivity?.id === activity.id && showVisitButton? (
                    <button onClick={() => {interestedClick(activity)}}>
                      {userActivity.visited ? "I've been!" : "JK I haven't been"}
                      </button>
                  ) : console.log("nada")}
              </div>
            ));
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


export default Visited;