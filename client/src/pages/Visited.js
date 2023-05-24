import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { ActivitiesContext } from '../ActivitiesContext';
import SearchBar from '../components/SearchBar';
import ActivityCard from './ActivityCard';
import Paper from '@mui/material/Paper';


function Visited() {
  const { user } = useContext(UserContext)
  const { filteredByAllCriteria } = useContext(ActivitiesContext)

  const userVisitedActivities = filteredByAllCriteria.filter(activity => {
    const matchingUserActivity = activity.user_activities.find(userActivity => {
      return userActivity.user_id === user?.id && userActivity.visited === true;
    });
    return matchingUserActivity !== undefined;
  });

  if (user) {
    return (
      <>
        <div className="activities-page-container">
          <SearchBar></SearchBar>
          <Paper className="activities-list-container">
            {userVisitedActivities.length > 0 ? (
                userVisitedActivities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity}></ActivityCard>
                ))
              ) : (
                  <p className='empty-interested-visited'>Head back to All Activities to add places you've been!</p>
              )}
          </Paper>
        </div>
      </>
    ) ;
  } else {
    return (
      <div id="login-signup-container-div">
        <Paper id="login-signup-paper">
        <h2>Please log in or create an account to save the places you've visited.</h2>
        </Paper>
      </div>
    )
  }
}


export default Visited;