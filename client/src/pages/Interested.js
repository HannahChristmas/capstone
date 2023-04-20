import React, { useContext } from 'react';
import { UserContext } from '../UserContext';

function Interested({activities}) {

    const {user} = useContext(UserContext)

    if (!user) {
      return <p>Profile loading...</p>
    }

    if (user) {
    return (
      <>
        <div className="all-activities">
          <h1>I'm Interested</h1>
        </div>

        <div className="interested-activities-container">
          {activities.map((activity) => {
            const userActivities = activity.user_activities.filter((userActivity) => {
              return userActivity.username = user?.username;
            });
            return userActivities.map((userActivity) => (
              <div key={activity.id} className="individual-activity">
                <h4>{activity.title}</h4>
                <h3>{userActivity.interested.toString()}</h3>
              </div>
            ));
          })}
        </div>
      </>
      );
  
  }
}

export default Interested;
