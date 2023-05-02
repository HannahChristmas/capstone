import './index.css';
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginHomeScreen from './pages/LoginHomeScreen.js';
import LoginNav from './components/LoginNav';
import LoginForm from './components/LoginForm';
import CreateAccount from './pages/CreateAccount.js';
import AllActivities from './pages/AllActivities.js';
import Interested from './pages/Interested.js';
import Visited from './pages/Visited.js';
import UserProfile from './pages/UserProfile';
import { UserContext } from './UserContext'; 
import { ActivitiesContext } from './ActivitiesContext'; 

function App() {
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showInterestedUsers, setShowInterestedUsers] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSelectedActivity(null); // set state to null every time the location changes
  }, [location]);

  const userInterested = !!selectedActivity?.user_activities.find((userActivity) => userActivity.user_id === user?.id && userActivity.interested === true);
  const userVisited = !!selectedActivity?.user_activities.find((userActivity) => userActivity.user_id === user?.id && userActivity.visited === true);

  const userInterestedActivities = activities.filter(activity => {
    const matchingUserActivity = activity.user_activities.find(userActivity => {
      return userActivity.user_id === user.id && userActivity.interested === true;
    });
    return matchingUserActivity !== undefined;
  });
  


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
      .then(activities => {
        const sortedActivities = activities.sort((a, b) => a.title.localeCompare(b.title))
        setActivities(sortedActivities)
      })
  }, [setActivities])
// DO I NEED SETSELECTEDACTIVITY IN THE DEPENDENCY ARRAY?!?!?

  const sortByName = () => {
    const sortedActivities = [...activities].sort((a, b) => {
      const nameA = a.title.toUpperCase(); 
      const nameB = b.title.toUpperCase(); 
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    setActivities(sortedActivities);
  }

  const sortByCost = () => {
    setActivities([...activities].sort((a, b) => a.cost - b.cost));
  };

  const handleViewClick = (activity) => {
    setSelectedActivity(activity);
    setShowInterestedUsers(false);
  }

  const handleXClick = () => {
    setSelectedActivity(null);
  }

  const displayInterestedUsers = () => {
    setShowInterestedUsers(!showInterestedUsers);
  };

  function interestedClick() {
    const userActivity = selectedActivity.user_activities?.find((userActivity) => userActivity.user_id === user.id)
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
        const updatedUserActivity = selectedActivity.user_activities.map((activity) => activity.id === data.id ? data : activity)
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

  function visitedClick() {
    const userActivity = selectedActivity.user_activities?.find((userActivity) => userActivity.user_id === user.id)
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
        const updatedUserActivity = selectedActivity.user_activities.map((activity) => activity.id === data.id ? data : activity)
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
        <UserContext.Provider value={{ user, setUser, userInterested, userVisited }}>
        <ActivitiesContext.Provider value={{
          activities,
          selectedActivity,
          setSelectedActivity,
          handleViewClick,
          handleXClick,
          interestedClick,
          visitedClick,
          displayInterestedUsers,
          sortByName,
          sortByCost,
          showInterestedUsers,
         }}>
            <LoginNav />
            <main>
                <Routes>
                    <Route path="/" element={<LoginHomeScreen />}></Route>
                    <Route path="/login" element={<LoginForm />}></Route>
                    <Route path="/logout" element={<LoginHomeScreen />}></Route>
                    <Route path="/create-account" element={<CreateAccount />}></Route>
                    <Route path="/user-profile" element={<UserProfile />}></Route>
                    <Route path="/activities" element={<AllActivities/>}></Route>
                    <Route path="/interested" element={<Interested userInterestedActivities={userInterestedActivities}/>} ></Route>
                    <Route path="/visited" element={<Visited/>}></Route>
                </Routes>
            </main>
          </ActivitiesContext.Provider>
        </UserContext.Provider>
        </>
    );
}

export default App;