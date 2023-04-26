
import React, { useContext } from 'react';
import { UserContext } from '../UserContext';

function AllActivities({activities, selectedActivity, setSelectedActivity, interestedClick, visitedClick, userInterested, interestButton}) {

  const {user} = useContext(UserContext)


  const handleViewClick = (activity) => {
    setSelectedActivity(activity);
    console.log("activity from handleViewClick AA: ", activity)
  }

  const handleXClick = () => {
    setSelectedActivity(null);
  }

  // We want to ask selectedActivity to look through user_activities and see if a user_activity object has a user_id that matches user.id 

  function askSelectedActivity() {
    // double bang operator turns things that are truthy into true and falsey into false (undefined turns into false)
    return !!selectedActivity.user_activities.find((userActivity) => userActivity.user_id === user.id);
  }

  return (
    <>
      <div className="activities-page-container">
        <div className="activity-search-container">
          <p>search by keyword...</p>
          <p>location ↓</p>
          <p>category ↓</p>
          <p>add an activity</p>
        </div>

        <div className="activities-list-container">
          {activities.map((activity) => (
            <div key={activity.id} className="individual-activity">
              <h1>{activity.title}</h1>
              <h2>{activity.neighborhood}</h2>
              <h4>${activity.cost}</h4>
              <button onClick={() => handleViewClick(activity)}>Quick View</button>
            </div>           
          ))}
        </div>

      {selectedActivity && (
        <div className="popup-card">
          <h2>{selectedActivity.title}</h2>
          <h2>{selectedActivity.neighborhood}</h2>
          <button id="interested-button" onClick={() => interestedClick(selectedActivity)}>{askSelectedActivity() ? "YA WOO" : "booo false"}</button><br/>
          <button onClick={() => visitedClick(selectedActivity)}>Visited</button><br/><br/><br/>
          <button>reviews</button><br/>
          <button>who's interested</button><br/>
          <button onClick={() => handleXClick(selectedActivity)}>X</button>
        </div>
      )}
      </div>
   </>
  );
}

export default AllActivities;
