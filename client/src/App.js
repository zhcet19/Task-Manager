import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dashboard from './components/Dashboard';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

const PrivateRoute = ({ component: Component }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Basic auth check
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default App;
