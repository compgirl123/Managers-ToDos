import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import "./TopBar.scss";
import { StyledEngineProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

/**
 * TopBar Component
 * This Component is used to define the TopBar of the page.
 * Material Ui Framework Is used (MUI)
 */
export const TopBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loginInfo');
    console.log('After Removal:', localStorage.getItem('loginInfo'));
    navigate('/');
  }

  return (
    <StyledEngineProvider injectFirst>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className="navBar">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Welcome user!
            </Typography>
            <Button color="inherit">EN</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </StyledEngineProvider>
 );
}
