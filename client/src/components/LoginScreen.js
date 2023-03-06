import '../index.css';
import { useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';

function LoginScreen( {onLogin} ) {

  const [showLogin, setShowLogin] = useState(true)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function loginClick(){
    setShowLogin(!showLogin)
    console.log("Yo! Show login has been clicked")
  }

  return (
    <>
    {/* <header className="header-container"> */}
        {/* <h1 id="login-logo-cincy-social">CINCY SOCIAL</h1> */}
      {/* <div> */}
      {/* <h3 id="login-nav" onClick={loginClick}>LOGIN</h3>
      <h3 id="login-nav">CREATE ACCOUNT</h3> */}
    
      {/* </div> */}
   {/* </header> */}

   <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <h1 id="login-logo-cincy-social">CINCY SOCIAL</h1>

        <Tooltip title="Account settings">
          <IconButton
            id="login-nav"
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 50, height: 50 }}>CS</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={loginClick}>
          <Avatar /> Login
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Create Account
        </MenuItem>
      </Menu>
    </React.Fragment>
 

    {/* {showLogin? (
      <>
        <h1>YOOOOO SHOW LOGIN IS TRUE!</h1>
      </>
    ) : (
      <>
        <h1>dang show log in is false</h1>
      </>
    )} */}

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

export default LoginScreen;
