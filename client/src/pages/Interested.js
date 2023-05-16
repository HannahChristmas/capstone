import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { ActivitiesContext } from '../ActivitiesContext';
import SearchBar from '../components/SearchBar';
import ActivityCard from './ActivityCard';
import Paper from '@mui/material/Paper';


function Interested() { 
  const {user} = useContext(UserContext)
  const { filteredByAllCriteria } = useContext(ActivitiesContext)

  const userInterestedActivities = filteredByAllCriteria.filter(activity => {
    const matchingUserActivity = activity.user_activities.find(userActivity => {
      return userActivity.user_id === user?.id && userActivity.interested === true;
    });
    return matchingUserActivity !== undefined;
  });

  if (user) {
    return (
      <>
        <div className="activities-page-container">
          <SearchBar></SearchBar>
          <Paper className="activities-list-container">
            {userInterestedActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity}></ActivityCard>
            ))}
          </Paper>
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