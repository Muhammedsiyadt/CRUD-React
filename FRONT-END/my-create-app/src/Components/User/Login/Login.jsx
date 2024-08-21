import React, { useState } from "react";
import { Box, Grid, TextField, Button, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import login_img from "../../../assets/login_page_img.jpg";
import API from "../../../../config/AxiosConfig";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { userLogin } from "../../../Redux/userAuth";

const Login = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value.trim(),
    });
  };

  const validate = () => {
    let errors = {};
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            console.log("Form submitted successfully", formValues);
            const response = await API.post("/user/login", formValues);

            if (response.data.status === "success") {
                const { token } = response.data;
                
                dispatch(userLogin(token));
                
                toast.success("Login successful!");
                navigate('/');
            } else {
                toast.error("Invalid credentials!");
            }
        } else {
            setFormErrors(errors);
            toast.error("Please fix the errors in the form.");
        }
    } catch (error) {
        console.error(error);
        toast.error("Login failed. Please try again.");
    }
};



  const handleSignUpRedirect = () => {
    navigate("/signup");
  };

  return (
    <div>
      <Grid container alignItems="center" justifyContent="center" style={{ minHeight: "100vh" }}>
        <Grid item xs={12} md={6} lg={3}> {/* Adjusted lg value to reduce size */}
          <Box display="flex" flexDirection="column" alignItems="center" p={2} boxShadow={3} borderRadius={2}>
            <img src={login_img} alt="Crud logo" style={{ width: "150px", height: "150px", marginBottom: "20px" }} /> {/* Decreased image size */}
            <Typography variant="h5" component="h1" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
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
                Login
              </Button>
            </form>
            <Box mt={2}>
              <Typography variant="body2" align="center">
                Don't have an account?{" "}
                <Link component="button" variant="body2" onClick={handleSignUpRedirect}>
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
