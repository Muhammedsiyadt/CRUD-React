const express = require('express');
const router = express.Router();
const { routeProtect, isUser } = require('../Middleware/Middleware');
const upload = require('../cloudinary'); // Path to your Multer configuration
const userController = require('../controller/userController/userController');

router.post('/login', userController.login);  
router.post('/signup', userController.signUp); 
router.get('/get/userData', routeProtect, isUser , userController.getUserData);
router.put('/updateprofile', routeProtect,isUser, upload.single('image'), userController.updateProfile);
router.get('/userHome/userData', routeProtect,isUser, userController.getDataFromHome)
 
module.exports = router;  
   