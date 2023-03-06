import './index.css';
import React, { useEffect, useState } from "react";
import LoginScreen from './components/LoginScreen.js'

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

  if (!user) return <LoginScreen onLogin={setUser}/>

  return (
    <>
      <h1>Hey what's up. I'll put a nav bar here.</h1>
   </>
  );
}

export default App;
