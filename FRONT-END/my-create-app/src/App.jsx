import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginpage from "./Pages/Loginpage";
import Signuppage from "./Pages/Signuppage";
import AdminLoginPage from "./Pages/AdminLoginPage";
import HomeUser from "./Pages/HomeUser";
import AdminDashboard from "./Pages/AdminDashboard";
import EditUser from "./Components/Admin/EditUser/EditUser";
import CreateUser from "./Components/Admin/CreateUser/CreateUser";
// import Edit from "./Components/User/Edit/Edit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./Components/User/Profile/Profile";
import AdminLoginProtecter from "./Routes/AdminLoginProtecter";
import AdminRouteProtecter from "./Routes/AdminRouteProtecter";
import UserLoginProtecter from "./Routes/UserLoginProtect";
import UserRouteProtecter from "./Routes/UserRouterProtector";
import Error from "./Components/User/error/Error";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route element={<UserLoginProtecter />}>
            <Route path="/login" element={<Loginpage />} />
            <Route path="/signup" element={<Signuppage />} />
            <Route path="/error" element={<Error />} />
          </Route>

          <Route element={<UserRouteProtecter />}>
            <Route path="/" element={<HomeUser />} />
            {/* <Route path="/edit" element={<Edit />} /> */}
            <Route path="/profile" element={<Profile />} />
            
          </Route>

          <Route element={<AdminLoginProtecter />}>
            <Route path="/adminlogin" element={<AdminLoginPage />} />
          </Route>

          <Route element={<AdminRouteProtecter />}>
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/adminEditUser/:id" element={<EditUser />} />
            <Route path="/createUser" element={<CreateUser />} />
          </Route>
          
        </Routes>
      </Router>
    </>
  );
};

export default App;
