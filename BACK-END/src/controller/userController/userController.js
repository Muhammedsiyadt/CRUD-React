
const User = require('../../models/userSchema')

const jwt = require('../../JWT/jwt')



exports.signUp = async (req, res) => {
    try {
        
        const { name, email, password, image } = req.body;  
        
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            console.log('User already exists')
            return res.status(400).json({ message: "User already exists" });
        }
        
        const newUser = new User({ name, email, password, image });
        await newUser.save(); 
        
        console.log("User created successfully", newUser);
        
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error in signUp:", error);
        res.status(500).json({ message: "Server error" });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: "User not found" });
        }

        if (password !== user.password) {
            
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const generatedToken = jwt.createToken(email);
        console.log("Generated Token:", generatedToken);

        res.cookie('usertoken', generatedToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 1000, 
        });

        return res.status(200).json({ 
            message: "Login successful",
            status: "success",
            token: generatedToken,
        });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: "Server error" });
    }
};



exports.updateProfile = async (req, res) => {
    try {
        const { email, name, password, image } = req.body;
        const updatedData = { name, password, image };
        
        const updatedUser = await User.findOneAndUpdate(
            { email },
            updatedData,
            { new: true }
        );
        
        if (!updatedUser) {
            return res.status(400).json({ message: "User not found" });
        }
        
        console.log("User updated successfully", updatedUser);
        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error in updateProfile:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// GET USER DATA 
exports.getUserData = async (req, res) => {
   try {
    
     const userData= await User.findOne({email:req.user.payload})
      res.status(200).json({userData})



   } catch (error) {
       console.log(error)
   }
}
