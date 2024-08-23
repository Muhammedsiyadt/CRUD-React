const User = require('../../models/userSchema');
const jwt = require('../../JWT/jwt');
const cloudinary = require('../../cloudinaryConfig');

exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const image = req.file ? req.file.path : null; // Get the Cloudinary URL

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ name, email, password, image });
    await newUser.save();

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
      return res.status(400).json({ message: "User not found" });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const generatedToken = jwt.createToken(email);
    res.cookie('usertoken', generatedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000, 
    });

    res.status(200).json({ message: "Login successful", status: "success", token: generatedToken });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const image = req.file ? req.file.path : null; // Get the Cloudinary URL
    const updatedData = { name, password, image }; 

    const updatedUser = await User.findOneAndUpdate(
      { email },
      updatedData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error in updateProfile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.getUserData = async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.user.payload });
    res.status(200).json({ userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getDataFromHome = async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.user.payload })
    res.status(200).json({ userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
