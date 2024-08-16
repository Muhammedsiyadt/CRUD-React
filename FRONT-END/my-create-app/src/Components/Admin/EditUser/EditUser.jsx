import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container, Card } from '@mui/material';
import './EditUser.css'
import AdminHeader from '../Header/AdminHeader';

const EditUser = () => {
  const { id } = useParams(); // Get the user ID from URL params
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    // Fetch user data by ID
    // Mock data for demonstration; replace with your data fetching logic
    const fetchedUser = {
      id: id,
      name: 'John Doe',
      email: 'john.doe@example.com'
    };
    setUser(fetchedUser);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated user:', user);
    navigate('/admindashboard'); 
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
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 2 }}
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
