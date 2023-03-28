import '../index.css';
import { useState } from "react";
import * as React from 'react';
import LoginNav from '../components/LoginNav';

function LoginHomeScreen() {

  return (
    <>
    {/* <LoginNav></LoginNav> */}
      <div className="login-welcome-div">

        <h1 id="login-header-whats-happening">what's happening in cincy?</h1>
        <p className="welcome-sentences">find something fun to do.<br></br>
        plan it with your friends.<br></br>
        document it here.</p>
      </div>
      <div id="login-footer">
        <img id="footer-image" src="https://i.ibb.co/qFPpqCQ/skyline3.png" alt="skyline"/>
      </div>
   </>
  );
}

export default LoginHomeScreen;
