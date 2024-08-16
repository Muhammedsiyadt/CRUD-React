import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loginpage from './Pages/Loginpage';
import Signuppage from './Pages/Signuppage';
import AdminLoginPage from './Pages/AdminLoginPage';
import HomeUser from './Pages/HomeUser';
import AdminDashboard from './Pages/AdminDashboard';
import EditUser from './Components/Admin/EditUser/EditUser';
import CreateUser from './Components/Admin/CreateUser/CreateUser';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeUser/>} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/adminlogin" element={<AdminLoginPage />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/adminEditUser/:id" element={<EditUser />} />
        <Route path="/createUser" element={<CreateUser />} />
      </Routes>
    </Router>
  );
};

export default App;
