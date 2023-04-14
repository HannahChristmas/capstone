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
  const [selectedActivity, setSelectedActivity] = useState(null);
  // const [userInterested, setUserInterested] = useState(false)

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
  }, [])

  function interestedClick() {
    const {id, title, neighborhood} = selectedActivity
    console.log({title}, "interested from App.js")
    // when the current user clicks this button, the interested boolean on the user_activites table needs to update
    fetch('/user_activities', {
      method: 'POST',
      body: JSON.stringify({
        user_id: user.id,
        activity_id: selectedActivity.id,
        interested: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        // handle success
        console.log("interested nice")
        
      } else {
        // handle error
        console.log("interested no work not nice")
      }
    });
  }
  console.log({selectedActivity}, "selectedActivity from App.js")
  console.log("From fetch request at App.js:", activities)

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <LoginNav />
        <main>
          <Routes>
            <Route path="/" element={<LoginHomeScreen/>}></Route>
            <Route path="/login" element={<LoginForm/>}></Route>
            <Route path="/logout" element={<LoginHomeScreen/>}></Route>
            <Route path="/create-account" element={<CreateAccount/>}></Route>
            <Route path="/user-profile" element={<UserProfile/>}></Route>
            <Route path="/activities" element={<AllActivities activities={activities} selectedActivity={selectedActivity} setSelectedActivity={setSelectedActivity} interestedClick={interestedClick}/>}></Route>
            <Route path="/interested" element={<Interested interestedClick={interestedClick}/>} ></Route>
            <Route path="/visited" element={<Visited/>}></Route>
          </Routes>
        </main>
    </UserContext.Provider>
   </>
  );
}


export default App;
