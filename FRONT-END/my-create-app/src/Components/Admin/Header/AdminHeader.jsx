import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './AdminHeader.css';

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate('/admindashboard');
  };

  const handleLogoutClick = () => {
    console.log('Logout clicked');
    navigate('/adminlogin');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" alignItems="center" width="100%" justifyContent="space-between">
          <Typography variant="h6" style={{ marginLeft: '20px' }} onClick={handleDashboardClick}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogoutClick} endIcon={<ExitToAppIcon />}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
