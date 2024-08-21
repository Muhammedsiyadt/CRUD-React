const express = require('express')
const router = express.Router()
const { routeProtect } = require('../Middleware/Middleware');

const userController = require('../controller/userController/userController')

router.post('/login',userController.login)

router.post('/signup', userController.signUp) 

router.get('/get/userData',routeProtect, userController.getUserData)



router.put('/updateprofile' , userController.updateProfile)




module.exports = router; 