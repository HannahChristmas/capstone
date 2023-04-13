import React, { useContext } from 'react';
import { UserContext } from '../UserContext';


function Visited() {
    const {user} = useContext(UserContext);
  
    if (user) {
     return (
       <>
         <div className="all-activities">
           <h1>I've been there</h1>
         </div>
         <div id="login-footer">
           {/* <img id="footer-image" src="https://i.ibb.co/qFPpqCQ/skyline3.png" alt="skyline"/> */}
         </div>
       </>
       );
   } else {
   return (
     <h2>Please log in or create account to see the places you've visited.</h2>
     )
   }
 }

export default Visited;
