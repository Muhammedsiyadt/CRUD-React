const jwt = require('jsonwebtoken');
const User = require('../models/userSchema')

const routeProtect = (req, res, next) => {

    const authHeader = req.headers.authorization; 
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        
        if (err) {
          return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }

        req.user = decoded; 
        next();
    });
};

// When the admin delete user then user should back to login page
const isUser =async (req, res, next) => {
    try {
        
      
        const user=await User.findOne({email:req.user.payload})
         console.log(user)
        if(!user){

            return res.status(403).send({"message":"user is not available"})
             
        }
        next()

    } catch (error) {
        console.log(error);

        res.status(500).send({"message":"internal server"})
        
    }
};


module.exports = {
   routeProtect,
   isUser
};
