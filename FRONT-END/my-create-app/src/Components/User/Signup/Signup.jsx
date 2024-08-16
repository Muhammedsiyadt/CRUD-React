import React, { useState } from "react";
import { Box, Grid, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import signup_img from "../../../assets/login_page_img.jpg";

const SignUp = () => {
  const [formValues, setFormValues] = useState({ name: "", email: "", password: "" });
  const [formErrors, setFormErrors] = useState({ name: "", email: "", password: "" });
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
      errors.name = "User Name is required";
    }
    if (!formValues.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formValues.password) {
      errors.password = "Password is required";
    } else if (formValues.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      console.log("Form submitted successfully", formValues);
      // Add your sign-up logic here
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div>
      <Grid container alignItems="center" justifyContent="center" style={{ minHeight: "100vh" }}>
        <Grid item xs={12} md={6} lg={3}> {/* Adjusted lg value to reduce size */}
          <Box display="flex" flexDirection="column" alignItems="center" p={2} boxShadow={3} borderRadius={2}>
            <img src={signup_img} alt="Sign Up" style={{ width: "150px", height: "150px", marginBottom: "20px" }} /> {/* Decreased image size */}
            <Typography variant="h5" component="h1" gutterBottom>
              Sign Up
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="User Name"
                id="name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                error={Boolean(formErrors.name)}
                helperText={formErrors.name}
                required
              />
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
                error={Boolean(formErrors.email)}
                helperText={formErrors.email}
                required
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
              />
              <Button variant="contained" color="primary" fullWidth type="submit" style={{ marginTop: "20px" }}>
                Sign Up
              </Button>
            </form>
            <Box mt={2}>
              <Typography variant="body2" align="center">
                Already Have an Account?{" "}
                <span onClick={() => navigate('/login')} style={{ color: "blue", cursor: "pointer" }}>
                  Sign In Now
                </span>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignUp;
