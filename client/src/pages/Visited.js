import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../UserContext';

// import ActivityNav from '../components/ActivityNav';

function Visited() {
    // const message = useContext(UserContext)
    const {user, setUser} = useContext(UserContext);
  
    return (
    <>
    {/* <ActivityNav></ActivityNav> */}
   <div className="all-activities">
        <h2>ABOUT- from video</h2>
        <h1>I've been there</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>
   </div>
   <div id="login-footer">
    <img id="footer-image" src="https://i.ibb.co/qFPpqCQ/skyline3.png" alt="skyline"/>
   </div>
   </>
  );
}

export default Visited;
