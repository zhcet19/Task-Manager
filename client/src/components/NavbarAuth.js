import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const NavbarAuth = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ bgcolor: '#1976d2' }}>
      <Toolbar>
        <Box display="flex" flexGrow={1} alignItems="center" onClick={() => navigate('/')}> 
          {/* <Typography variant="h6" component="div" sx={{ cursor: 'pointer' }} }> */}
          <CalendarMonthIcon sx={{ ml: 5 }} />
        {/* </Typography> */}
        </Box>
        <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
        <Button color="inherit" onClick={() => navigate('/register')}>Signup</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarAuth;
