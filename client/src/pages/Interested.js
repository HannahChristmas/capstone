import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { ActivitiesContext } from '../ActivitiesContext';
import SortBar from '../components/SortBar';
import SearchBar from '../components/SearchBar';


function Interested() {
  const {user} = useContext(UserContext)
  const { activities, selectedActivity, setSelectedActivity, interestedClick } = useContext(ActivitiesContext)

  const [showInterestButton, setShowInterestButton] = useState(false);

  function viewClick(activity) {
    setSelectedActivity(activity)
    setShowInterestButton(true)
  }

  if (user) {
    return (
      <>
        <SortBar></SortBar>
        <div className="activities-page-container">
          <SearchBar></SearchBar>
        <div className="activities-list-container">
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
                <button onClick={() => viewClick(activity)}>View</button><br></br>
                  {selectedActivity?.id === activity.id && showInterestButton? (
                    <button onClick={() => {interestedClick(activity)}}>
                      {userActivity.interested ? "❤️" : "♡"}
                      </button>
                  ) : null}
              </div>
            ));
          })}
        </div>
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