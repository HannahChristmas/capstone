import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { ActivitiesContext } from '../ActivitiesContext';

function ActivityCard({activity}) {
  const { userInterested, userVisited } = useContext(UserContext)
  const { showInterestedUsers, selectedActivity, interestedClick, visitedClick, handleViewClick, handleXClick, displayInterestedUsers } = useContext(ActivitiesContext)

    return (
      <>
        <div key={activity.id} className="individual-activity">
          <h1>{activity.title}</h1>
          <h2>{activity.neighborhood}</h2>
          <h4>${activity.cost}</h4>
          <button onClick={() => handleViewClick(activity)}>Quick View</button>
        </div>  

        {selectedActivity?.id === activity?.id && (
        <div className="popup-card">
          <h2>{selectedActivity.title}</h2>
          <h2>{selectedActivity.neighborhood}</h2>
          <button onClick={() => interestedClick(selectedActivity)}>{userInterested ? "❤️" : "♡"}</button><br/>
          <button onClick={() => visitedClick(selectedActivity)}>{userVisited ? "YAYA" : "Nono"}</button><br/><br/><br/>
          <button>reviews</button><br/>
          <button onClick={displayInterestedUsers}>who's interested</button><br/>
          {showInterestedUsers && selectedActivity.users.map((userActivity => 
            <h1 key={userActivity.id}>{userActivity.username}</h1>))}
          <button onClick={() => handleXClick(selectedActivity)}>X</button>
        </div>
        )}  
     </>
    );
  }
  
  export default ActivityCard;
  