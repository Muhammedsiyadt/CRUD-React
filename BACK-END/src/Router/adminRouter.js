const express = require('express')
const router = express.Router()
const controller = require('../controller/adminController/adminController')

router.post('/adminlogin/check',controller.loginCheck)

router.post('/createuser',controller.createUser)

// Find all users for dashboard
router.get('/getUsers', controller.findUsers)

// delete User
router.delete('/deleteUser', controller.deleteUser)

// Edit User
router.get('/findUserForEdit', controller.findUserForEdit)
// Update user data
router.put('/updateUser', controller.updateUserData)



module.exports = router;