const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig'); 

const storage = new CloudinaryStorage({
  cloudinary,
  params: { 
    folder: 'profile_pictures', 
    allowedFormats: ['jpg', 'jpeg', 'png'],
  },  
});    

const upload = multer({ storage });  

module.exports = upload;
