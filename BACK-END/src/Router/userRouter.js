const express = require('express')
const router = express.Router()

const userController = require('../controller/userController/userController')

router.post('/login',userController.login)

router.post('/signup', userController.signUp) 



router.put('/updateprofile' , userController.updateProfile)




module.exports = router; 