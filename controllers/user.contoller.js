import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { setCookies } from "../utils/features.js";
import cookieParser from "cookie-parser";
dotenv.config();

export const getAllUsers = async (req, res) => {};

// LOGIN FUNCTION
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res
        .status(404)
        .json({ success: false, message: "incorrect credentials" });
    setCookies(user, res, 201, `Welcome back ${user.name}`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// REGISTER FUNCTION
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(500).json({
        success: false,
        message: "User already present",
      });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const finalUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    setCookies(finalUser, res, 200, "Successfully registered");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// to get the details of a user
export const getMyProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ success: false, message: "WHYYYYYYY" });
    }
    return res.status(201).json({ success: true, user: req.user });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// to log out the user

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV == "development" ? "lax" : "none",
        secure: process.env.NODE_ENV == "development" ? false : true,
      })
      .json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
