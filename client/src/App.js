import './index.css';
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginHomeScreen from './pages/LoginHomeScreen.js'
import LoginNav from './components/LoginNav';
import Login from './pages/Login.js';
import CreateAccount from './pages/CreateAccount.js'
import AllActivities from './pages/AllActivities.js'
import Interested from './pages/Interested.js'
import Visited from './pages/Visited.js'


function App() {

  const [user, setUser] = useState(null);
  // const [activities, setActivities] = useState([]);

  // useEffect(() => {
  //   fetch("/activities")
  //   .then(r => r.json())
  //   .then(activities => setActivities(activities))
  // }, [])

  useEffect(() => {
    fetch("/me").then((res) => {
      if (res.ok) {
        res.json().then((user) => setUser(user));
      }
    });
  }, []);

  // if (!user) return <LoginHomeScreen onLogin={setUser}/>

  return (
    <>
    
      <LoginNav></LoginNav>
      <main>
        <Routes>
          <Route path="/" element={<LoginHomeScreen/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/create-account" element={<CreateAccount/>}></Route>
          <Route path="/logged-in" element={<AllActivities/>}></Route>
          <Route path="/activities" element={<AllActivities/>}></Route>
          <Route path="/interested" element={<Interested/>}></Route>
          <Route path="/visited" element={<Visited/>}></Route>

        </Routes>
    </main>
   </>
  );
}

export default App;
