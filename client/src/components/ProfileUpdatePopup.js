import React from 'react';
import { useContext} from 'react'
import { UserContext } from "../UserContext";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom'

const ProfileUpdatePopup = ({ open, onClose }) => {

const { user } = useContext(UserContext)

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Your profile has been updated!</DialogTitle>
      <DialogContent>
        <Typography>
          Click <Link to={`/users/${user.id}`} id="edited-profile-popup-link">here</Link> to view your updated profile.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileUpdatePopup;