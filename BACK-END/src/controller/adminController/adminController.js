const User = require("../../models/userSchema");
const jwt = require("../../JWT/jwt");

exports.loginCheck = (req, res) => {
  const admin = {
    name: "admin@gmail.com",
    password: "Admin@123",
  };

  const { name, password } = req.body;

  if (name === admin.name && password === admin.password) {
    const generatedToken = jwt.createToken(name);
    return res.status(200).json({
      message: "Login successful",
      status: "success",
      token: generatedToken,
    });
  } else {
    return res
      .status(401)
      .json({ message: "Invalid credentials", status: "error" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, image } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ name, email, password, image });
    await newUser.save();

    console.log("User created successfully", newUser);
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error in createUser:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// FIND ALL USERS FOR DASHBOARD
exports.findUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
  }
};

// DELETE USER FROM DASHBOARD
exports.deleteUser = async (req, res) => {
  try {
    const id = req.query.id;
    await User.deleteOne({ _id: id });
    res.status(200).json({ message: "User Deleted Successfully..." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
};

// FIND THE USER FOR EDIT
exports.findUserForEdit = async (req, res) => {
  try {
    const id = req.query.id;
    const findUser = await User.findOne({ _id: id });
    res.status(200).json({ user: findUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
};

// UPDATE THE USER DATA
exports.updateUserData = async (req, res) => {
  try {
    const {name, email} = req.body
    await User.findOneAndUpdate({_id: req.body.id},{$set: {
        name: name,
        email : email
    }})
    res.status(200).json('Updated successfully..')
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
};
