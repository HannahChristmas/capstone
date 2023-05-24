import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { ActivitiesContext } from '../ActivitiesContext';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import interestedImage from '../photos/Interested.png'
import notInterestedImage from '../photos/Not-interested.png'
import visitedImage from '../photos/Visited.png'
import notVisitedImage from '../photos/Not-visited.png'
import websiteImage from '../photos/Website.png'
import whoVisited from '../photos/Who-visited.png'
import whoLikes from '../photos/Who-likes.png'
import editActivityImage from '../photos/Edit-activity.png'
import userImage from '../photos/User.png'



function PopupCard({activity}) {
  const { user } = useContext(UserContext)
  const { activities, setActivities, selectedActivity, setSelectedActivity } = useContext(ActivitiesContext)
  const navigate = useNavigate();

  const [showInterestedUsers, setShowInterestedUsers] = useState(false);
  const [showVisitedUsers, setShowVisitedUsers] = useState(false);

  const userInterested = !!selectedActivity?.user_activities.find((userActivity) => userActivity.user_id === user?.id && userActivity.interested === true);
  const userVisited = !!selectedActivity?.user_activities.find((userActivity) => userActivity.user_id === user?.id && userActivity.visited === true);

  const interestedUsers = activity.user_activities
  .filter(userActivity => userActivity.interested && userActivity.user_id !== user?.id)
  .map(userActivity => {
    const user = activity.users.find(user => user.id === userActivity.user_id);
    return user ? user : null;
  })
  .filter(username => username !== null);

  const visitedUsers = activity.user_activities
  .filter(userActivity => userActivity.visited && userActivity.user_id !== user?.id)
  .map(userActivity => {
    const user = activity.users.find(user => user.id === userActivity.user_id);
    return user ? user : null;
  })
  .filter(username => username !== null)

  const handleXClick = () => {
    setSelectedActivity(null);
  }

  const handleActivityPageClick = (activityId) => {
    console.log(activityId)
    navigate(`/activities/${activityId}`);
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
    return (
      <>
        <Paper className="popup-card">
        <div id="activity-title-popup">
                <h2>{selectedActivity.title}</h2>
        </div>
        <div className="popup-card-content">
            {/* DIV with photo & current user buttons */}
            <div id="photo-and-current-user-buttons">
                <img src={activity.image} id="activity-card-pic" alt="activity-pic"></img><br></br>
                <button onClick={() => window.open(activity.website, '_blank')} className="custom-button">
                    <img className="website-icon" src={websiteImage} alt="website-icon"></img>
                </button>
            { user ? (
                <>
                <button className="custom-button" onClick={() => interestedClick(selectedActivity)}>
                    {userInterested ? (
                    <>
                        <img className="interest-icon" src={interestedImage} alt="interested-icon"></img>
                    </>
                    ) : (
                    <>
                        <img className="interest-icon" src={notInterestedImage} alt="not-interested-icon"></img>
                    </>
                    )}
                </button>
                <button className="custom-button" onClick={() => visitedClick(selectedActivity)}>
                    {userVisited ? (
                        <>
                        <img className="visited-icon" src={visitedImage} alt="visited-icon"></img>
                        </>
                    ) : (
                        <>
                        <img className="not-visited-icon" src={notVisitedImage} alt="not-visited-icon"></img>
                        </>
                    )}
                </button>
                <button onClick={() => handleActivityPageClick(selectedActivity.id)} className="custom-button">
                    <img className="website-icon" src={editActivityImage} alt="edit-activity-icon"></img>
                </button>
                </>
            ) : (
                <p>You must log in to update your interests and places you've visited.</p>
            )}

            </div>
            {/* DIV with Activity info & other user buttons */}
            <div id="popup-card-activity-info">
                <p>{selectedActivity.neighborhood} · ${activity.cost}</p>
                <p>{activity.address}</p>
                <p>{activity.phone_number}</p>
                <p>
                {activity.category.map((category, index) => (
                    <span key={category}>
                    {category}
                    {index !== activity.category.length - 1 && ", "}
                    </span>
                ))}
                </p>
                <div id="other-users-div">
                    <div id="other-users-expanded">
                        <button className="custom-button" onClick={displayInterestedUsers}>
                            <img className="who-buttons" src={whoLikes} alt="user-likes" />
                        </button>
                        {showInterestedUsers && 
                        (interestedUsers.length === 0 ?
                            <p>no other users have added this to their favorites yet.</p> :
                            interestedUsers.map((user) => 
                            <span>
                                <a href={`/users/${user.id}`} key={user.id}>
                                <h3><img src={userImage} className="generic-user-image" alt="generic-user"></img> {user.username}</h3>
                                </a>
                            </span>
                            )
                        )
                        }
                    </div>
                    <div id="other-users-expanded">
                        <button className="custom-button" onClick={displayVisitedUsers}>
                            <img className="who-buttons" src={whoVisited} alt="user-visited" />
                        </button>
                        {showVisitedUsers && 
                        (visitedUsers.length === 0 ?
                            <p>no other users have visited yet.</p> :
                            visitedUsers.map((user) => 
                            <span>
                                <a href={`/users/${user.id}`} key={user.id}>
                                <h3><img src={userImage} className="generic-user-image" alt="generic-user"></img> {user.username}</h3>
                                </a>
                            </span>
                            )
                        )
                        }
                    </div>
                </div>
            </div>
        </div>
        <div id="x-button-div">
            <h2 onClick={() => handleXClick(selectedActivity)}>X</h2>
        </div>
        </Paper>
     </>
    );
  }
  
  export default PopupCard;
  