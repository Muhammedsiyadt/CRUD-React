const express = require('express');
const router = express.Router();
const controller = require('../controller/adminController/adminController');
const { routeProtect } = require('../Middleware/Middleware');

// Admin login route (no protection required)
router.post('/adminlogin/check', controller.loginCheck);

// All routes below require authentication
router.post('/createuser', routeProtect, controller.createUser);

// Find all users for dashboard
router.get('/getUsers', routeProtect, controller.findUsers);

// Delete user
router.delete('/deleteUser', routeProtect, controller.deleteUser);

// Find a user for editing
router.get('/findUserForEdit', routeProtect, controller.findUserForEdit);

// Update user data
router.put('/updateUser', routeProtect, controller.updateUserData);

module.exports = router;
