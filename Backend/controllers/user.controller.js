import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken'; 
export const registerUser = async (req, res) => {
  try {
    const { email, password, fullname } = req.body;

    // 1. Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,  // Save hashed password
      fullname,
    });

    await newUser.save();

    if (!newUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Failed to register user', error: err });
  }
};



export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.ACCESS_SECRET_KEY,
      { expiresIn: '1d' }
    );

    res.status(200).json({ message: "Login successful", token });

  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
