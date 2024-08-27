import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, Avatar } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Profile.css"; // Ensure to create a corresponding CSS file
import Header from "../Header/Header";
import API from "../../../../config/AxiosConfig"; 
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const userData = async () => {
      try {
        const token = localStorage.getItem('usertoken');
        const response = await API.get('/user/get/userData', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.userData);
      } catch (error) {
        if(axios.isAxiosError(error)){
          console.log("erorr",error)
          if(error.response.status==403){
            console.log("successes")
            localStorage.removeItem("usertoken")
            navigate("/login") 
    
          }
         console.log(error.response.status,"ooo")
      }
      }
    }
    userData();
  }, []);

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value.trim(),
    });

    // Custom validation for name input
    if (name === 'name' && /[^a-zA-Z\s]/.test(value)) {
      setFormErrors({
        ...formErrors,
        name: 'Name must contain only letters and spaces.',
      });
    } else {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setUser({
      ...user,
      photo: file,
    });
  };

  const validate = () => {
    let errors = {};
    if (!user.name) {
      errors.name = "Name is required";
    } else if (/[^a-zA-Z\s]/.test(user.name)) {
      errors.name = "Name must contain only letters and spaces.";
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
        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('password', user.password);
        if (user.photo) {
          formData.append('image', user.photo); // Append the file
        }
  
        const token = localStorage.getItem('usertoken');
  
        // Make the API call to update the profile
        const response = await API.put('/user/updateprofile', formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
  
        // Assuming the response contains the updated user data
        setUser(response.data.userData); // Update the state with new user data
  
        toast.success("Profile updated successfully!");
        navigate('/');
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
              src={user.photo ? URL.createObjectURL(user.photo) : ''}
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
