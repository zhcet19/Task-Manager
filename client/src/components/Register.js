import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarAuth from './NavbarAuth';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const payload = { firstName, lastName, email, password };

    console.log('Sending payload:', payload);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, payload);
      navigate('/login');
    } catch (error) {
      console.error('Error during registration:', error.response.data);
      alert('Registration failed');
    }
  };

  return (
    <>
     <NavbarAuth/>
      <Container maxWidth="sm" sx={{ my:5}}>
      <Typography variant="h4" sx={{  mt:5 , fontWeight:"bold", color:"#2196f3"}}>Signup</Typography>
        <Box display="flex" flexDirection="column" alignItems="center" mt={4} sx={{ border: '1px solid #2196f3', padding: 4, borderRadius: 4 }}>
         
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              margin="normal"
              fullWidth
              label="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              label="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
              Signup
            </Button>
          </form>
          <Box display="flex"   alignItems="center"  mt={2}>
            <Typography variant="body2">Already have an account?</Typography>
            <Link href="/login" variant="body2" sx={{ ml: 1 }}>
              Login
            </Link>
          </Box>
          {/* <Button variant="contained" color="primary"  sx={{ mt: 2 }}>
            Signup with Google
          </Button> */}
        </Box>
      </Container>
    </>
  );
}

export default Register;
