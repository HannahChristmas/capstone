import React, { useContext } from 'react';
import { UserContext } from '../UserContext';

function Interested({activities, setSelectedActivity}) {

  const handleViewClick = () => {
    console.log("Clicked it")
  }
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
              return userActivity.username = user?.username && userActivity.interested === true;
            });
            return userActivities.map((userActivity) => (
              <div key={activity.id} className="individual-activity">
                <h4>{activity.title}</h4>
                <h3>{userActivity.interested.toString()}</h3>
                <button onClick={handleViewClick}>View</button>
              </div>
            ));
          })}
        </div>
      </>
      );
  
  }
}

export default Interested;
