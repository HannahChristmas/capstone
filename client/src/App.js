import logo from './logo.svg';
import './index.css';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


function App() {
  return (
    <>
    <header className="header-container">
        <h1 id="login-logo-cincy-social">CINCY SOCIAL</h1>
      <div>
      <h3 id="login-nav">LOGIN</h3>
      <h3 id="login-nav">CREATE ACCOUNT</h3>
      </div>
   </header>
   <div className="login-welcome-div">
    <h1 id="login-header-whats-happening">what's happening in cincy?</h1>
    <p className="welcome-sentences">find something fun to do.<br></br>
    plan it with your friends.<br></br>
    document it here.</p>
   </div>
   <img src="https://i.ibb.co/qFPpqCQ/skyline3.png" alt="skyline"/>
   </>
  );
}

export default App;
