import React, { useContext } from 'react';
import { ActivitiesContext } from '../ActivitiesContext';

function ActivityCard() {

  const { activities, setActivities, selectedActivity, interestedClick, visitedClick, handleViewClick, handleXClick, displayInterestedUsers } = useContext(ActivitiesContext)

    return (
      <>
        {activities.map((activity) => (
            <div key={activity.id} className="individual-activity">
              <h1>{activity.title}</h1>
              <h2>{activity.neighborhood}</h2>
              <h4>${activity.cost}</h4>
              <button onClick={() => handleViewClick(activity)}>Quick View</button>
            </div>           
          ))}
     </>
    );
  }
  
  export default ActivityCard;
  