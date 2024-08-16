import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import admin_img from '../../../assets/admin_logn_img.jpeg'; 
import './Login.css'; // Import the CSS file

const AdminLogin = () => {
  const [formValues, setFormValues] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Admin Login:', formValues);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      className="admin-login-container"
    >
      <img src={admin_img} alt="Admin Login" className="admin-login-image" />
      <Typography variant="h5" component="h1" gutterBottom className="admin-login-title">
        {/* Admin Login */}
      </Typography>
      <form onSubmit={handleSubmit} className="admin-login-form">
        <TextField
          fullWidth
          label="Email"
          id="email"
          name="email"
          type="email"
          value={formValues.email}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
          className="admin-login-input"
        />
        <TextField
          fullWidth
          label="Password"
          id="password"
          name="password"
          type="password"
          value={formValues.password}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
          className="admin-login-input"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          className="admin-login-button"
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default AdminLogin;
