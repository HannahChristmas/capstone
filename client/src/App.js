import './index.css';
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginHomeScreen from './pages/LoginHomeScreen.js'
import LoginNav from './components/LoginNav';
import LoginForm from './components/LoginForm';
import CreateAccount from './pages/CreateAccount.js'
import AllActivities from './pages/AllActivities.js'
import Interested from './pages/Interested.js'
import Visited from './pages/Visited.js'
import UserProfile from './pages/UserProfile';
import { UserContext } from './UserContext';

function App() {
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [userActivities, setUserActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const userInterested = !!selectedActivity?.user_activities.find((userActivity) => userActivity.user_id === user.id && userActivity.interested === true);

  useEffect(() => {
      fetch("/me").then((res) => {
          if (res.ok) {
              res.json().then((user) => {
          if (user !== null) {
              setUser(user)
          }
          });
      }
      });
  }, []);

  useEffect(() => {
      fetch("/activities")
      .then(r => r.json())
      .then(activities => setActivities(activities))
  }, [setActivities, setSelectedActivity])

  useEffect(() => {
    fetch("/user_activities")
    .then(r => r.json())
    .then(userActivities => setUserActivities(userActivities))
}, [setUserActivities])

  function interestedClick() {
    if(selectedActivity.user_activities.find((userActivity) => userActivity.user_id === user.id)) {
      fetch(`/user_activities/${selectedActivity.id}`, { 
        method: 'PATCH',
        body: JSON.stringify({
        user_id: user.id,
        activity_id: selectedActivity.id,
        interested: false, 
        }),
        headers: {
        'Content-Type': 'application/json'
        }
      })
      .then(r => r.json())
      .then(data => {
        const updatedUserActivity = selectedActivity.user_activities.map((activity) => activity.id === data.id ? selectedActivity : activity)
        selectedActivity.user_activities = updatedUserActivity
        const updatedActivities = activities.map((activity) => {
          if (selectedActivity.id === activity.id) {
            return selectedActivity
          } else {
            return activity
          }
        })
      setActivities(updatedActivities)
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
    return (
        <>
        <UserContext.Provider value={{ user, setUser, userInterested }}>
            <LoginNav />
            <main>
                <Routes>
                    <Route path="/" element={<LoginHomeScreen />}></Route>
                    <Route path="/login" element={<LoginForm />}></Route>
                    <Route path="/logout" element={<LoginHomeScreen />}></Route>
                    <Route path="/create-account" element={<CreateAccount />}></Route>
                    <Route path="/user-profile" element={<UserProfile />}></Route>
                    <Route path="/activities" element={<AllActivities activities={activities} selectedActivity={selectedActivity} setSelectedActivity={setSelectedActivity} interestedClick={interestedClick}  />}></Route>
                    <Route path="/interested" element={<Interested userInterested={userInterested} selectedActivity={selectedActivity} setSelectedActivity={setSelectedActivity} interestedClick={interestedClick} activities={activities} userActivities={userActivities} setUserActivities={setUserActivities}/>} ></Route>
                    <Route path="/visited" element={<Visited />}></Route>
                </Routes>
            </main>
        </UserContext.Provider>
        </>
    );
}

export default App;