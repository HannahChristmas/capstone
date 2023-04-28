import './index.css';
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
  const [showInterestedUsers, setShowInterestedUsers] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSelectedActivity(null); // set state to null every time the location changes
  }, [location]);

  const userInterested = !!selectedActivity?.user_activities.find((userActivity) => userActivity.user_id === user?.id && userActivity.interested === true);

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

  const handleViewClick = (activity) => {
    setSelectedActivity(activity);
    setShowInterestedUsers(false);
    console.log("selectedActivity from view click: ", activity)
  }

  const handleXClick = () => {
    setSelectedActivity(null);
  }

  const displayInterestedUsers = () => {
    setShowInterestedUsers(!showInterestedUsers);
  };

  function interestedClick() {
    // If the selectedActivity.user_activities already has a user_id that matches user, && userActivity.user toggle the user interest
    const userActivity = selectedActivity.user_activities?.find((userActivity) => userActivity.user_id === user.id)
    if(userActivity) {
      fetch(`/user_activities/${userActivity.id}`, { 
        method: 'PATCH',
        body: JSON.stringify({
        // user_id: user.id,
        // activity_id: selectedActivity.id,
        interested: !userActivity.interested
        // interested: selectedActivity?.interested !== undefined ? !selectedActivity.interested : false,
      }),
        headers: {
        'Content-Type': 'application/json'
        }
      })
      .then(r => r.json())
      .then(data => {
        console.log("data", data)

        console.log("first", userActivity.interested)
        // console.log("userActivity", userActivity)

        const updatedUserActivity = selectedActivity.user_activities.map((activity) => activity.id === data.id ? data : activity)
        selectedActivity.user_activities = updatedUserActivity

        const updatedActivities = activities.map((activity) => {
          if (selectedActivity.id === activity.id) {
            return selectedActivity
          } else {
            return activity
          }
          
        })

        console.log("SA from PATCH: ", selectedActivity)
      setActivities(updatedActivities)
      console.log(selectedActivity.interested)
      })
    // } else if (selectedActivity.user_activities?.find((userActivity) => userActivity.user_id === user.id && selectedActivity.interested === true)) {
      // selectedActivity.user_activities has no user_id that matches user, create it with value of true
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

    if(selectedActivity.user_activities.find((userActivity) => userActivity?.user_id === user.id)) {
      console.log("we want a visited patch request")
    } else {
      console.log("We want a visited post request")
    }

    console.log(`${user.username} clicked the ${selectedActivity.title} visited button!` )
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
                    <Route path="/activities" element={<AllActivities 
                      activities={activities} 
                      selectedActivity={selectedActivity} 
                      setSelectedActivity={setSelectedActivity}
                      handleViewClick={handleViewClick} 
                      handleXClick={handleXClick}
                      interestedClick={interestedClick}
                      showInterestedUsers={showInterestedUsers}
                      displayInterestedUsers={displayInterestedUsers} 
                      visitedClick={visitedClick} />}></Route>
                    <Route path="/interested" element={<Interested 
                      selectedActivity={selectedActivity} 
                      handleViewClick={handleViewClick}
                      handleXClick={handleXClick}
                      displayInterestedUsers={displayInterestedUsers} 
                      showInterestedUsers={showInterestedUsers}
                      setSelectedActivity={setSelectedActivity} 
                      interestedClick={interestedClick} 
                      activities={activities} 
                      userActivities={userActivities}
                      setUserActivities={setUserActivities}/>} ></Route>
                    <Route path="/visited" element={<Visited />}></Route>
                </Routes>
            </main>
        </UserContext.Provider>
        </>
    );
}

export default App;