import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import "./CreateUser.css";
import AdminHeader from "../Header/AdminHeader";

const CreateUser = () => {
  const [user, setUser] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New user created:", user);
    // Add your logic to handle form submission
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
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="submit-button"
          >
            Create
          </Button>
        </form>
      </Box>
    </>
  );
};

export default CreateUser;
