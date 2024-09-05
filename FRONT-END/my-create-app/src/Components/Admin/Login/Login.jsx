import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import admin_img from '../../../assets/admin_logn_img.jpeg';
import './Login.css'; 
import API from '../../../../config/AxiosConfig';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminLogin } from '../../../Redux/adminAuthSlice';

const AdminLogin = () => {
  const [formValues, setFormValues] = useState({ name: '', password: '' });
  const [formErrors, setFormErrors] = useState({ name: '', password: '' });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value.trim(),
    });
  };

  const validate = () => {
    let errors = {};
    if (!formValues.name) {
       toast.error("Name is required")
    }
    if (!formValues.password) {
       toast.error("Password is required")
    } else if (formValues.password.length < 6) {
       toast.error("Password must be at least 6 characters")
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const errors = validate();
      if (Object.keys(errors).length === 0) {
        const response = await API.post("/admin/adminlogin/check", formValues);
        if (response.data.status === 'success') {
          const { token } = response.data;
          localStorage.setItem('adminToken', token);

          dispatch(adminLogin(token));

          console.log("HAPPY TEACHERS") 
          

          toast.success('Login successful!');

          navigate('/admindashboard');
        } else {
          toast.error('Invalid credentials!');
        }
      } else {
        setFormErrors(errors);
      }
    } catch (error) {
      console.error(error);
      toast.error('Login failed!');
    }
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
        Admin Login
      </Typography>
      <form onSubmit={handleSubmit} className="admin-login-form">
        <TextField
          fullWidth
          label="Name"
          id="name"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          error={Boolean(formErrors.name)}
          helperText={formErrors.name}
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
          error={Boolean(formErrors.password)}
          helperText={formErrors.password}
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
