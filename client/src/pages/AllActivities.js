
import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';

function AllActivities({activities, selectedActivity, showInterestedUsers, setSelectedActivity, displayInterestedUsers, interestedClick, visitedClick, handleXClick, handleViewClick }) {

  console.log("1) SA from AA: ", selectedActivity)

  const { userInterested } = useContext(UserContext)

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
          <button onClick={() => interestedClick(selectedActivity)}>{userInterested ? "❤️" : "♡"}</button><br/>
          <button onClick={() => visitedClick(selectedActivity)}>Visited</button><br/><br/><br/>
          <button>reviews</button><br/>
          <button onClick={displayInterestedUsers}>who's interested</button><br/>
          {showInterestedUsers && selectedActivity.users.map((userActivity => 
            <h1 key={userActivity.id}>{userActivity.username}</h1>))}
          <button onClick={() => handleXClick(selectedActivity)}>X</button>
        </div>
      )}
      </div>
   </>
  );
}

export default AllActivities;
