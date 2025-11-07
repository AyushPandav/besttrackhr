import React, { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8080/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        const token = data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('EMSusername', username);

        // Decode JWT to extract role
        let userRole = 'EMPLOYEE'; // default
        try {
          const decoded = jwtDecode(token);
          userRole = decoded.role || decoded.authorities?.[0]?.authority || 'EMPLOYEE';
        } catch (decodeError) {
          console.warn('Failed to decode token:', decodeError);
        }

        alert('Login successful. Welcome!');
        
        // Role-based navigation
        if (userRole === 'HR' || userRole === 'ADMIN') {
          navigate('/hradmin/hradminpage');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(data.message || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      setLoading(false);
      setError('Server is not responding. Please try again later.');
      console.error('Login error:', err);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 2,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 420,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: 'white',
            textAlign: 'center',
            padding: '1.5rem',
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Team Track
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.9 }}>
            Sign in to manage your workforce
          </Typography>
        </Box>

        <CardContent sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              sx={{ mb: 2 }}
              InputProps={{
                style: { fontFamily: 'Poppins, sans-serif' },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                style: { fontFamily: 'Poppins, sans-serif' },
              }}
            />

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                <CircularProgress size={28} />
              </Box>
            ) : (
              <Button
                fullWidth
                variant="contained"
                type="submit"
                size="large"
                sx={{
                  py: 1.5,
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a5cdb, #7c4ddf)',
                  },
                }}
              >
                Sign In
              </Button>
            )}

            {error && (
              <Typography color="error" textAlign="center" sx={{ mt: 2, fontSize: '0.9rem' }}>
                {error}
              </Typography>
            )}

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2">
                Don't have an account?{' '}
                <Button component="a" href="/register" color="primary" sx={{ textTransform: 'none' }}>
                  Register
                </Button>
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Forgot password?{' '}
                <Button component="a" href="/verify-username" color="primary" sx={{ textTransform: 'none' }}>
                  Reset here
                </Button>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;