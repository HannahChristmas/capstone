import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { ActivitiesContext } from '../ActivitiesContext';
import Paper from '@mui/material/Paper';


function ActivityCard({activity}) {
  const { user } = useContext(UserContext)
  const { activities, setActivities, selectedActivity, setSelectedActivity } = useContext(ActivitiesContext)

  const [showInterestedUsers, setShowInterestedUsers] = useState(false);
  const [showVisitedUsers, setShowVisitedUsers] = useState(false);


  const userInterested = !!selectedActivity?.user_activities.find((userActivity) => userActivity.user_id === user?.id && userActivity.interested === true);
  const userVisited = !!selectedActivity?.user_activities.find((userActivity) => userActivity.user_id === user?.id && userActivity.visited === true);

  const interestedUsers = activity.user_activities
    .filter(activity => activity.interested)
    .map(activity => activity.user_id)
    .map(userId => {
      const user = activity.users.find(user => user.id === userId);
      return user ? user : null;
    })
    .filter(username => username !== null)

  const visitedUsers = activity.user_activities
  .filter(activity => activity.visited)
  .map(activity => activity.user_id)
  .map(userId => {
    const user = activity.users.find(user => user.id === userId);
    return user ? user : null;
  })
  .filter(username => username !== null)

  // const visitedUsers = activity.user_activities.filter(activity => activity.visited)
  // .map(activity => activity.user_id)
  // .map(userId => activity.users.find(user => user.id === userId).username);


  const handleViewClick = (activity) => {
    (activity?.id === selectedActivity?.id ? setSelectedActivity(null) : setSelectedActivity(activity))
    setShowInterestedUsers(false);
  }

  const handleXClick = () => {
    setSelectedActivity(null);
  }

  const displayInterestedUsers = () => {
    setShowInterestedUsers(!showInterestedUsers);
  }

  const displayVisitedUsers = () => {
    setShowVisitedUsers(!showVisitedUsers);
  }

  function interestedClick() {

    const userActivity = selectedActivity?.user_activities?.find((userActivity) => userActivity?.user_id === user.id)
    if(userActivity) {
      fetch(`/user_activities/${userActivity.id}`, { 
        method: 'PATCH',
        body: JSON.stringify({
        interested: !userActivity.interested
      }),
        headers: {
        'Content-Type': 'application/json'
        }
      })
      .then(r => r.json())
        
      .then(data => {
        const deletedUserActivityId = data.deleted_user_activity_id?.id;

        if (deletedUserActivityId) {
          const updatedUserActivities = selectedActivity.user_activities.filter(userActivity => userActivity.id !== deletedUserActivityId);
          const updatedSelectedActivity = {...selectedActivity, user_activities: updatedUserActivities}
            setSelectedActivity(updatedSelectedActivity)
          const updatedActivities = activities.map((activity) => 
            selectedActivity.id === activity.id ? updatedSelectedActivity : activity);
            setActivities(updatedActivities);
        } else {
          const updatedUserActivity = selectedActivity.user_activities.map((activity) => activity.id === data.user_activity.id? data.user_activity : activity)          
          const updatedSelectedActivity = {...selectedActivity, user_activities: updatedUserActivity}
            setSelectedActivity(updatedSelectedActivity)
          const updatedActivities = activities.map((activity) => 
          selectedActivity.id === activity.id ? updatedSelectedActivity : activity);
            setActivities(updatedActivities)
        }
      })
    } else {
    fetch('/user_activities', { 
      method: 'POST',
      body: JSON.stringify({
      user_id: user.id,
      activity_id: selectedActivity.id,
      interested: true,
      }),
      headers: {
      'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(data => {
      selectedActivity.user_activities.push(data)
      const updatedActivities = activities.map((activity) => {
        if (selectedActivity.id === activity.id) {
          return selectedActivity
        } else {
          return activity
        }
      })
    setActivities(updatedActivities)
    })
  }
}

function visitedClick() {
  const userActivity = selectedActivity?.user_activities?.find((userActivity) => userActivity?.user_id === user.id)
  if(userActivity) {
    fetch(`/user_activities/${userActivity.id}`, { 
      method: 'PATCH',
      body: JSON.stringify({
      visited: !userActivity.visited
    }),
      headers: {
      'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
      
    .then(data => {
      const deletedUserActivityId = data.deleted_user_activity_id?.id;

      if (deletedUserActivityId) {
        const updatedUserActivities = selectedActivity.user_activities.filter(userActivity => userActivity.id !== deletedUserActivityId);
        const updatedSelectedActivity = {...selectedActivity, user_activities: updatedUserActivities}
          setSelectedActivity(updatedSelectedActivity)
        const updatedActivities = activities.map((activity) => 
          selectedActivity.id === activity.id ? updatedSelectedActivity : activity);
          setActivities(updatedActivities);
      } else {
        const updatedUserActivity = selectedActivity.user_activities.map((activity) => activity.id === data.user_activity.id? data.user_activity : activity)          
        const updatedSelectedActivity = {...selectedActivity, user_activities: updatedUserActivity}
          setSelectedActivity(updatedSelectedActivity)
        const updatedActivities = activities.map((activity) => 
        selectedActivity.id === activity.id ? updatedSelectedActivity : activity);
          setActivities(updatedActivities)
      }
    })
  } else {
  fetch('/user_activities', { 
    method: 'POST',
    body: JSON.stringify({
    user_id: user.id,
    activity_id: selectedActivity.id,
    visited: true,
    }),
    headers: {
    'Content-Type': 'application/json'
    }
  })
  .then(r => r.json())
  .then(data => {
    selectedActivity.user_activities.push(data)
    const updatedActivities = activities.map((activity) => {
      if (selectedActivity.id === activity.id) {
        return selectedActivity
      } else {
        return activity
      }
    })
  setActivities(updatedActivities)
  })
}
}
    
  // function visitedClick() {
  //   const userActivity = selectedActivity.user_activities?.find((userActivity) => userActivity.user_id === user.id)
  //   if(userActivity) {
  //     fetch(`/user_activities/${userActivity.id}`, { 
  //       method: 'PATCH',
  //       body: JSON.stringify({
  //       visited: !userActivity.visited
  //     }),
  //       headers: {
  //       'Content-Type': 'application/json'
  //       }
  //     })
  //     .then(r => r.json())
  //     .then(data => {
  //       const updatedUserActivity = selectedActivity.user_activities.map((activity) => activity.id === data.id ? data : activity)
  //       selectedActivity.user_activities = updatedUserActivity
  //       const updatedActivities = activities.map((activity) => {
  //         if (selectedActivity.id === activity.id) {
  //           return selectedActivity
  //         } else {
  //           return activity
  //         }
  //       })
  //     setActivities(updatedActivities)
  //     })
  //     } else {
  //     fetch('/user_activities', { 
  //       method: 'POST',
  //       body: JSON.stringify({
  //       user_id: user.id,
  //       activity_id: selectedActivity.id,
  //       visited: true,
  //       }),
  //       headers: {
  //       'Content-Type': 'application/json'
  //       }
  //     })
  //     .then(r => r.json())
  //     .then(data => {
  //       selectedActivity.user_activities.push(data)
  //       const updatedActivities = activities.map((activity) => {
  //         if (selectedActivity.id === activity.id) {
  //           return selectedActivity
  //         } else {
  //           return activity
  //         }
  //       })
  //     setActivities(updatedActivities)
  //     })
  //   }
  // }

    return (
      <>
        <Paper key={activity.id} className="individual-activity">
          <h1>{activity.title}</h1>
          <h2>{activity.neighborhood}</h2>
          <h4>${activity.cost}</h4>
          <button onClick={() => handleViewClick(activity)}>Quick View</button>
        </Paper>  

        {selectedActivity?.id === activity?.id && (
        <div className="popup-card">
          <h2>{selectedActivity.title}</h2>
          <h2>{selectedActivity.neighborhood}</h2>
          <a href={activity.website} target="_blank" rel="noreferrer">website</a><br></br>

          { user ? (
            <>
              <button onClick={() => interestedClick(selectedActivity)}>{userInterested ? "❤️" : "♡"}</button><br/>
              <button onClick={() => visitedClick(selectedActivity)}>{userVisited ? "YAYA" : "Nono"}</button><br/><br/><br/>
            </>
          ) : (
            <p>You must log in to update your interests and places you've visited.</p>
          )}
          <button>reviews</button><br/>
          <button onClick={displayInterestedUsers}>who's interested</button><br/>
            {showInterestedUsers && 
              (interestedUsers.length === 0 ?
                <p>no users have added this to their interests yet.</p> :
                interestedUsers.map((user) => 
                <a href={`/users/${user.id}`} key={user.id}>
                  <h1>{user.username}</h1>
                </a>
                )
              )
            }
          <button onClick={displayVisitedUsers}>who's visited</button><br/>
            {showVisitedUsers && 
              (visitedUsers.length === 0 ?
                <p>no users have visited yet.</p> :
                visitedUsers.map((user) => 
                <a href={`/users/${user.id}`} key={user.id}>
                  <h1>{user.username}</h1>
                </a>
                )
              )
            }
          <button onClick={() => handleXClick(selectedActivity)}>X</button>
        </div>
        )}  
     </>
    );
  }
  
  export default ActivityCard;
  