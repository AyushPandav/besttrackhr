import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
=======
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if screen width is below 1000px
  const isMobile = useMediaQuery('(max-width:1000px)');

<<<<<<< HEAD
  const isActive = (path) => currentPath === path;
=======
  const isActive = path => currentPath === path;
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    const interval = setInterval(checkLoginStatus, 2000);
<<<<<<< HEAD
=======

>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const drawerContent = (
<<<<<<< HEAD
    <Box
      sx={{ width: 250, backgroundColor: '#3f51b5', height: '100%', color: '#1c1c1c' }}
      role="presentation"
    >
=======
    <Box sx={{ width: 250, backgroundColor: '#3f51b5', height: '100%', color: '#1c1c1c'}} role="presentation">
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
      <List>
        <ListItem button component={Link} to="/" selected={isActive('/')} onClick={handleDrawerToggle}>
          <ListItemText primary="Home" sx={{ color: isActive('/') ? '#ff9800' : '#1c1c1c' }} />
        </ListItem>
<<<<<<< HEAD

        <ListItem button component={Link} to="/about" selected={isActive('/about')} onClick={handleDrawerToggle}>
          <ListItemText primary="About" sx={{ color: isActive('/about') ? '#ff9800' : '#1c1c1c' }} />
        </ListItem>

        <ListItem button component={Link} to="/employee/emppage" selected={isActive('/employee/emppage')} onClick={handleDrawerToggle}>
          <ListItemText primary="Employees" sx={{ color: isActive('/employee/emppage') ? '#ff9800' : '#1c1c1c' }} />
        </ListItem>

        <ListItem button component={Link} to="/blogs" selected={isActive('/blogs')} onClick={handleDrawerToggle}>
          <ListItemText primary="Blogs" sx={{ color: isActive('/blogs') ? '#ff9800' : '#1c1c1c' }} />
        </ListItem>

        <ListItem button component={Link} to="/profile" selected={isActive('/profile')} onClick={handleDrawerToggle}>
          <ListItemText primary="Profile" sx={{ color: isActive('/profile') ? '#ff9800' : '#1c1c1c' }} />
        </ListItem>

        <ListItem button component={Link} to="/loginpage" selected={isActive('/loginpage')} onClick={handleDrawerToggle}>
          <ListItemText
            primary={isLoggedIn ? 'Logout' : 'Login'}
            sx={{ color: isLoggedIn ? 'red' : isActive('/loginpage') ? '#ff9800' : '#1c1c1c' }}
            onClick={isLoggedIn ? handleLogout : null}
          />
        </ListItem>

        <ListItem button component={Link} to="/registerpage" selected={isActive('/registerpage')} onClick={handleDrawerToggle}>
          <ListItemText primary="Register" sx={{ color: isActive('/registerpage') ? '#ff9800' : 'white' }} />
        </ListItem>
=======
        <ListItem button component={Link} to="/dashboard" selected={isActive('/dashboard')} onClick={handleDrawerToggle}>
          <ListItemText primary="Dashboard" sx={{ color: isActive('/dashboard') ? '#ff9800' : '#1c1c1c' }} />
        </ListItem>
        <ListItem button component={Link} to="/employees" selected={isActive('/employees')} onClick={handleDrawerToggle}>
          <ListItemText primary="Employees" sx={{ color: isActive('/employees') ? '#ff9800' : '#1c1c1c' }} />
        </ListItem>
        <ListItem button component={Link} to="/departments" selected={isActive('/departments')} onClick={handleDrawerToggle}>
          <ListItemText primary="Departments" sx={{ color: isActive('/departments') ? '#ff9800' : '#1c1c1c' }} />
        </ListItem>
        <ListItem button component={Link} to="/profile" selected={isActive('/profile')} onClick={handleDrawerToggle}>
          <ListItemText primary="Profile" sx={{ color: isActive('/profile') ? '#ff9800' : '#1c1c1c' }} />
        </ListItem>
        <ListItem button component={Link} to="/loginpage" selected={isActive('/loginpage')} onClick={handleDrawerToggle}>
  <ListItemText
    primary={isLoggedIn ? 'Logout' : 'Login'}
    sx={{ color: isLoggedIn ? 'red' : isActive('/loginpage') ? '#ff9800' : '#1c1c1c ' }}
    onClick={isLoggedIn ? handleLogout : null}
  />
</ListItem>
<ListItem button component={Link} to="/registerpage" selected={isActive('/registerpage')} onClick={handleDrawerToggle}>
  <ListItemText primary="Register" sx={{ color: isActive('/registerpage') ? '#ff9800' : 'white' }} />
</ListItem>
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#fefefeff', padding: '0.5rem 0' }}>
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: '#1c1c1c',
              fontSize: '1.5rem',
              fontWeight: 600,
            }}
          >
<<<<<<< HEAD
            <i data-feather="users" className="h-8 w-8 text-indigo-600"></i>
            Team Track
          </Typography>

=======
            <i data-feather="users" class="h-8 w-8 text-indigo-600"></i>Employee Management System
          </Typography>

          {/* Render drawer icon for mobile view */}
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
          {isMobile ? (
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          ) : (
<<<<<<< HEAD
=======
            // Render full menu for desktop view
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Button
                color={isActive('/') ? 'primary' : 'inherit'}
                component={Link}
                to="/"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: isActive('/') ? '#3e75ffff' : '#1c1c1c',
                }}
              >
                Home
              </Button>
<<<<<<< HEAD

              <Button
                color={isActive('/about') ? 'primary' : 'inherit'}
                component={Link}
                to="/about"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: isActive('/about') ? '#3e75ffff' : '#1c1c1c',
                }}
              >
                About
              </Button>

              <Button
                color={isActive('/employee/emppage') ? 'primary' : 'inherit'}
                component={Link}
                to="/employee/emppage"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: isActive('/employee/emppage') ? '#3e75ffff' : '#1c1c1c',
=======
              <Button
                color={isActive('/dashboard') ? 'primary' : 'inherit'}
                component={Link}
                to="/dashboard"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: isActive('/dashboard') ? '#3e75ffff' : '#1c1c1c',
                }}
              >
                Dashboard
              </Button>
              <Button
                color={isActive('/employees') ? 'primary' : 'inherit'}
                component={Link}
                to="/employees"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: isActive('/employees') ? '#3e75ffff' : '#1c1c1c',
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
                }}
              >
                Employees
              </Button>
<<<<<<< HEAD

=======
              <Button
                color={isActive('/departments') ? 'primary' : 'inherit'}
                component={Link}
                to="/departments"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: isActive('/departments') ? '#3e75ffff' : '#1c1c1c',
                }}
              >
                Departments
              </Button>
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
              <Button
                color={isActive('/profile') ? 'primary' : 'inherit'}
                component={Link}
                to="/profile"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: isActive('/profile') ? '#3e75ffff' : '#1c1c1c',
                }}
              >
                Profile
              </Button>
<<<<<<< HEAD

              {isLoggedIn ? (
                <Button
                  onClick={handleLogout}
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: 'red',
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  color={isActive('/loginpage') ? 'primary' : 'inherit'}
                  component={Link}
                  to="/loginpage"
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: isActive('/loginpage') ? '#3e75ffff' : '#1c1c1c',
                  }}
                >
                  Login
                </Button>
              )}

              <Button
                color={isActive('/registerpage') ? 'primary' : 'inherit'}
                component={Link}
                to="/registerpage"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: isActive('/registerpage') ? '#3e75ffff' : '#1c1c1c',
                }}
              >
                Register
              </Button>
=======
              {/* Conditional Login/Logout Button */}
              {isLoggedIn ? (
  <Button
    onClick={handleLogout}
    sx={{
      fontSize: '1rem',
      fontWeight: 500,
      color: 'red',
    }}
  >
    Logout
  </Button>
) : (
  <Button
    color={isActive('/loginpage') ? 'primary' : 'inherit'}
    component={Link}
    to="/loginpage"
    sx={{
      fontSize: '1rem',
      fontWeight: 500,
      color: isActive('/loginpage') ? '#3e75ffff' : '#1c1c1c',
    }}
  >
    Login
  </Button>
)}
<Button
  color={isActive('/registerpage') ? 'primary' : 'inherit'}
  component={Link}
  to="/registerpage"
  sx={{
    fontSize: '1rem',
    fontWeight: 500,
    color: isActive('/registerpage') ? '#3e75ffff' : '#1c1c1c',
  }}
>
  Register
</Button>
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
            </Box>
          )}
        </Toolbar>
      </AppBar>

<<<<<<< HEAD
=======
      {/* Drawer for mobile view */}
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Navbar;
