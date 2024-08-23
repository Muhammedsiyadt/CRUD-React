import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import "./CreateUser.css";
import AdminHeader from "../Header/AdminHeader";
import API from "../../../../config/AxiosConfig";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const CreateUser = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [formErrors, setFormErrors] = useState({ name: "", email: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Apply validations directly in handleChange
    setUser({
      ...user,
      [name]: value,
    });

    if (name === "name") {
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(value)) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          name: "Name must contain only letters and spaces",
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          name: "",
        }));
      }
    }

    if (name === "email") {
      if (!/\S+@\S+\.\S+/.test(value)) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email address is invalid",
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          email: "",
        }));
      }
    }

    if (name === "password") {
      if (value.length < 6) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          password: "Password must be at least 6 characters",
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          password: "",
        }));
      }
    }
  };

  const validate = () => {
    let errors = {};
    if (!user.name) {
      errors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(user.name)) {
      errors.name = "Name must contain only letters and spaces";
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
        console.log("New user created:", user);
        const token = localStorage.getItem('adminToken');
        const response = await API.post("/admin/createuser", user, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 201) {
          navigate('/admindashboard');
          toast.success("User created successfully");
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <>
      <AdminHeader />
      <Box p={3} className="create-user-container">
        <Typography variant="h4" gutterBottom className="create-user-title">
          Create New User
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            className="text-field"
            required
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
            className="text-field"
            required
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
            className="text-field"
            required
            error={Boolean(formErrors.password)}
            helperText={formErrors.password}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="submit-button"
            disabled={Boolean(formErrors.name) || Boolean(formErrors.email) || Boolean(formErrors.password)} // Disable button if there are errors
          >
            Create
          </Button>
        </form>
      </Box>
    </>
  );
};

export default CreateUser;
