import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import './AdminHeader.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../../Redux/adminAuthSlice';

const AdminHeader = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch()

  const handleLogoutClick = () => {
    dispatch(adminLogout('hii')) 
    navigate('/adminlogin'); 
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" alignItems="center" width="100%" justifyContent="space-between">
          <Typography 
            variant="h6" 
            className="dashboard-title"
          >
            <span className="colored-letter"><b>D</b></span>
            <span className="colored-letter"><b>a</b></span>
            <span className="colored-letter"><b>S</b></span>
            <span className="colored-letter"><b>h</b></span>
            <span className="colored-letter"><b>B</b></span>
            <span className="colored-letter"><b>o</b></span>
            <span className="colored-letter"><b>A</b></span>
            <span className="colored-letter"><b>r</b></span>
            <span className="colored-letter"><b>D</b></span>
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
