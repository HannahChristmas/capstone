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
  const location = useLocation();

  useEffect(() => {
    setSelectedActivity(null); // set state to null every time the location changes
  }, [location]);

  const userInterested = !!selectedActivity?.user_activities.find((userActivity) => userActivity.user_id === user?.id && userActivity.interested === true);
  const userVisited = !!selectedActivity?.user_activities.find((userActivity) => userActivity.user_id === user?.id && userActivity.visited === true);


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
    return (
        <>
        <UserContext.Provider value={{ user, setUser, userInterested, userVisited }}>
        <ActivitiesContext.Provider value={{
          activities,
          setActivities,
          selectedActivity,
          setSelectedActivity,
          sortByName,
          sortByCost,
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
                    <Route path="/interested" element={<Interested/>} ></Route>
                    <Route path="/visited" element={<Visited/>}></Route>
                </Routes>
            </main>
          </ActivitiesContext.Provider>
        </UserContext.Provider>
        </>
    );
}

export default App;