import { useEffect, useState, useContext } from 'react';
import ActivityNav from '../components/ActivityNav';
import { UserContext } from '../UserContext';

function Interested({activities}) {
  
    const {value, setValue} = useContext(UserContext)
    // const message = useContext(UserContext)

    return (
    <>
    <ActivityNav></ActivityNav>
   <div className="all-activities">

    <h1>I'm Interested</h1>
    {/* <div>{message}</div> */}
    <div>{value}</div>
    {/* <button onClick={() => setValue("Sup boys")}>Change Value</button> */}
    
   </div>
   <div id="login-footer">
    <img id="footer-image" src="https://i.ibb.co/qFPpqCQ/skyline3.png" alt="skyline"/>
   </div>
   </>
  );
}

export default Interested;
