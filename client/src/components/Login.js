import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarAuth from './NavbarAuth';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log()
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Incorrect email or password');
    }
  };

 

  return (
    <>
     <NavbarAuth/>
      <Container maxWidth="sm">
      <Typography variant="h4" sx={{  mt:5 , fontWeight:"bold", color:"#2196f3"}}>Login</Typography>
        <Box display="flex" flexDirection="column" alignItems="center" mt={4} sx={{ border: '1px solid #2196f3', padding: 4, borderRadius: 4 }}>
         
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
              Login
            </Button>
          </form>
          <Box display="flex"  alignItems="center"  mt={2}>
            <Typography variant="body2">Don't have an account?</Typography>
            <Link href="/register" variant="body2">
              Signup
            </Link>
          </Box>
          <Button variant="contained" color="primary"  sx={{ mt: 2 }} >
            Login with Google
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default LoginPage;
