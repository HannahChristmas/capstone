import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { ActivitiesContext } from '../ActivitiesContext';
import PopupCard from './PopupCard';

function ActivityCard({activity}) {
  const { userInterested, userVisited } = useContext(UserContext)
  const { showInterestedUsers, selectedActivity, setSelectedActivity, setShowInterestedUsers, interestedClick, visitedClick, handleViewClick, handleXClick, displayInterestedUsers } = useContext(ActivitiesContext)
  // const [toggle, setToggle] = useState({});

  // function toggleFunction(activity) {
  //   const currentActivity = selectedActivity === activity ? null : activity;
  //   setToggle({
  //     ...toggle,
  //     [activity.id]: currentActivity !== null,
  //   });
  //   setSelectedActivity(currentActivity);
  // }

  // console.log("selectedActivity outside func", selectedActivity)


    return (
      <>
      {/* //THIS ONE!!!!!!! */}
        <div key={activity.id} className="individual-activity">
          <h1>{activity.title}</h1>
          <h2>{activity.neighborhood}</h2>
          <h4>${activity.cost}</h4>
          <button onClick={() => handleViewClick(activity)}>Quick View</button>
        </div>  
{/* 
        <div key={activity.id} className="individual-activity">
          <h1>{activity.title}</h1>
          <h2>{activity.neighborhood}</h2>
          <h4>${activity.cost}</h4>
          <button onClick={() => toggleFunction(activity)}>Quick View</button>
            {toggle[activity.id] ? <PopupCard key={activity.id} activity={activity}></PopupCard> : null}
        </div>  */}

        {/* {activities.map((activity) => (
            <div key={activity.id} className="individual-activity">
              <h1>{activity.title}</h1>
              <h2>{activity.neighborhood}</h2>
              <h4>${activity.cost}</h4>
              <button onClick={() => handleViewClick(activity)}>Quick View</button>
            </div>           
          ))} */}

        {selectedActivity && (
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
  