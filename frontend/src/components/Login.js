import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Box, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
<<<<<<< HEAD
import { jwtDecode } from 'jwt-decode';
=======
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

<<<<<<< HEAD
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8080/authenticate', {
=======
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://employee-management-app-gdm5.onrender.com/authenticate', {
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
<<<<<<< HEAD
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        const token = data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('EMSusername', username);

        // Decode JWT to get the role
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role; // Assumes role is included as 'role' in JWT claims

        alert('Login successful. Welcome!');
        if (userRole === 'HR') {
          navigate('/hradmin/hradminpage');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(data.message || 'Invalid credentials. Please try again.');
=======

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        localStorage.setItem('token', data.token); // Store token in localStorage
        localStorage.setItem('EMSusername', username); // Store username in localStorage
        alert('Login successful. Welcome!');
        navigate('/dashboard'); // Correct navigation after login success
      } else {
        setError('Invalid credentials. Please try again.');
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
      }
    } catch (err) {
      setLoading(false);
      setError('Invalid credentials or our server is not currently active. Please try again later.');
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card sx={{ width: '100%', maxWidth: 400, boxShadow: 3, borderRadius: 4, padding: 2, backgroundColor: '#fff' }}>
        <CardContent>
          <Typography variant="h5" component="h2" textAlign="center" sx={{ marginBottom: '1rem' }}>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
<<<<<<< HEAD
              label="Email Address"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
=======
              label="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
              sx={{ marginBottom: '1rem' }}
              InputProps={{
                style: {
                  fontFamily: 'Poppins, sans-serif',
                },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
<<<<<<< HEAD
              onChange={(e) => setPassword(e.target.value)}
=======
              onChange={e => setPassword(e.target.value)}
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
              sx={{ marginBottom: '1rem' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleTogglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                style: {
                  fontFamily: 'Poppins, sans-serif',
                },
              }}
            />
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            ) : (
              <Button fullWidth variant="contained" color="primary" type="submit">
                Login
              </Button>
            )}
            {error && (
              <Typography color="error" textAlign="center" sx={{ marginTop: '1rem' }}>
                {error}
              </Typography>
            )}
            <Typography textAlign="center" sx={{ marginTop: '1rem' }}>
              Don't have an account?{' '}
              <Button color="primary" component="a" href="/register">
                Register
              </Button>
            </Typography>
            <Typography textAlign="center" sx={{ marginTop: '0.5rem' }}>
              Forgot your password?{' '}
              <Button color="primary" component="a" href="/verify-username">
                Reset Password
              </Button>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

<<<<<<< HEAD
export default Login;
=======
export default Login;
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
