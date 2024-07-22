import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import axios from 'axios';

const Navbar = () => {
  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/logout`, {});
      localStorage.removeItem('token'); // Remove the token from local storage
      window.location.href = '/'; // Redirect to the home page or login page
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <CalendarMonthIcon sx={{ ml: 5 }} />
        </Typography>
        <Button color="error" variant='contained' onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
