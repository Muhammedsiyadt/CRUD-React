import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container, Card } from '@mui/material';
import './EditUser.css';
import AdminHeader from '../Header/AdminHeader';
import API from '../../../../config/AxiosConfig';

const EditUser = () => {
  const { id } = useParams(); // Get the user ID from URL params
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '', id: '' });
  const [errors, setErrors] = useState({ name: '', email: '' }); // State for form validation errors

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await API.get(`/admin/findUserForEdit?id=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser({ name: response.data.user.name, email: response.data.user.email, id: response.data.user._id });
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation logic
    if (name === 'name') {
      const nameRegex = /^[A-Za-z\s]+$/; // Only allow letters and spaces
      if (!nameRegex.test(value)) {
        setErrors((prevErrors) => ({ ...prevErrors, name: 'Name must contain only letters.' }));
      } else if (value.trim().length < 2) {
        setErrors((prevErrors) => ({ ...prevErrors, name: 'Name must be at least 2 characters long.' }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
      }
    }

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setErrors((prevErrors) => ({ ...prevErrors, email: 'Please enter a valid email address.' }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
      }
    }

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check for errors before submitting
    if (errors.name || errors.email) {
      console.error('Please fix the validation errors before submitting.');
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      await API.put(`/admin/updateUser`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Updated user:', user);
      navigate('/admindashboard');
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  return (
    <>
      <AdminHeader />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Card sx={{ p: 3, boxShadow: 3 }}>
          <Typography variant="h4" gutterBottom align="center" color="primary">
            Edit User
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={user.name}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
                error={Boolean(errors.name)} // Display error state
                helperText={errors.name} // Display error message
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
                error={Boolean(errors.email)} // Display error state
                helperText={errors.email} // Display error message
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ mt: 2 }}
              disabled={Boolean(errors.name) || Boolean(errors.email)} // Disable button if there are errors
            >
              Save
            </Button>
          </form>
        </Card>
      </Container>
    </>
  );
};

export default EditUser;
