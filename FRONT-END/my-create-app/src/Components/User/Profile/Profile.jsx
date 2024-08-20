import React, { useState } from "react";
import { TextField, Button, Box, Typography, Avatar } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Profile.css"; // Ensure to create a corresponding CSS file
import Header from "../Header/Header";
import API from "../../../../config/AxiosConfig";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value.trim(), 
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setUser({
      ...user,
      photo: URL.createObjectURL(file),
    });
  };

  const validate = () => {
    let errors = {};
    if (!user.name) {
      errors.name = "Name is required";
    }
    if (!user.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = "Email address is invalid";
    }
    if (!user.password) {
      errors.password = "Password is required";
    } else if (user.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      try {
        // Assuming the user ID is available
        const userId = "user-id"; // Replace with actual user ID
        await API.put(`/user/updateprofile`, user);
        toast.success("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating user:", error);
        toast.error("Failed to update profile. Please try again.");
      }
    } else {
      setFormErrors(errors);
      toast.error("Please fix the errors in the form.");
    }
  };

  return (
    <>
      <Header />
      <Box p={3} mt={3} className="profile-container">
        <Typography variant="h4" gutterBottom className="profile-title">
          User Profile
        </Typography>
        <form onSubmit={handleSubmit} className="profile-form">
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <Avatar
              alt="User Photo"
              src={user.photo}
              sx={{ width: 100, height: 100 }}
              className="user-avatar"
            />
            <input
              accept="image/*"
              type="file"
              onChange={handlePhotoChange}
              style={{ display: "none" }}
              id="photo-upload"
            />
            <label htmlFor="photo-upload">
              <Button variant="contained" component="span" sx={{ mt: 2 }}>
                Change Photo
              </Button>
            </label>
          </Box>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
            className="text-field"
            error={Boolean(formErrors.name)}
            helperText={formErrors.name}
          />
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
            className="text-field"
            error={Boolean(formErrors.email)}
            helperText={formErrors.email}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
            className="text-field"
            error={Boolean(formErrors.password)}
            helperText={formErrors.password}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="submit-button"
          >
            Save Changes
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Profile;
