import React, { useEffect, useState, useContext } from 'react';
// import ActivityNav from '../components/ActivityNav';
import { UserContext } from '../UserContext';

function Interested({activities}) {
  
    const {user, setUser} = useContext(UserContext)
    // const message = useContext(UserContext)

    return (
    <>
    {/* <ActivityNav></ActivityNav> */}
   <div className="all-activities">
    <h2>HOME- from video</h2>
    <h1>I'm Interested</h1>
    {/* <div>{message}</div> */}
    <pre>{JSON.stringify(user, null, 2)}</pre>
    <button onClick={() => setUser("Sup boys")}>login</button>
    
   </div>
   <div id="login-footer">
    <img id="footer-image" src="https://i.ibb.co/qFPpqCQ/skyline3.png" alt="skyline"/>
   </div>
   </>
  );
}

export default Interested;
