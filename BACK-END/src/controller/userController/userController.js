
const User = require('../../models/userSchema')



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
            console.log('This is user not fount');
            return res.status(400).json({ message: "User not found" });
        }

        if (password !== user.password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        console.log('Success.....');
        
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: "Server error" });
    }
};


exports.updateProfile = (req, res) => {
    console.log(req.body);
    
}