import React, { useContext } from 'react';
import { UserContext } from '../UserContext';

function Interested({activities, setSelectedActivity, interestedClick}) {
  const {user} = useContext(UserContext)

  if (user) {
    return (
      <>
        <div className="all-activities">
          <h1>I'm Interested</h1>
          <h2>{user.username}</h2>
        </div>
        <div className="interested-activities-container">
          {activities.map((activity) => {
            const userActivities = activity.user_activities.filter((userActivity) => {
              // filter only returns what you don't take out
              return userActivity.user_id === user?.id && userActivity.interested === true;
            });
            return userActivities.map((userActivity) => (
              <div key={activity.id} className="individual-activity">
                <h4>{activity.title}</h4>
                <h3>{activity.neighborhood}</h3>
                <p>${activity.cost}</p>
                <button onClick={() => {
                  setSelectedActivity(activity)
                  interestedClick(activity)
                  }
                  }>{userActivity.interested ? "❤️" : "♡"}</button>
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

export default Interested;