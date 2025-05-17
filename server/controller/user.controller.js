import User from "../models/user.model.js";
import dotenv from "dotenv";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { sendMail } from "../utils/sendMail.js";
dotenv.config();

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already Exist!"
      });
    }

    const user = await User.create({ name, email, password });
    if (!user) {
      return res.status(400).json({
        message: "User not registered!"
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.verificationToken = token;

    await user.save();

    await sendMail(
      user.email,
      "Email verification!",
      "click the following link to verify email",
      // `<a href="${process.env.BASE_URL}/api/v1/users/verify/${token}">Verify Your Account</a>`
      `Link: <a>${process.env.BASE_URL}/api/v1/users/verify/${token}</a>`
    );

    res.status(201).json({
      message: "User registered successfully",
      success: true
    });
  } catch (error) {
    res.status(400).json({
      message: "User not registered ",
      error:error.message,
      success: false
    });
  }
};

const verifyUser = async (req, res) => {
  const { token } = req.params;
  try {
    if (!token) {
      return res.status(400).json({
        message: "User not registered!"
      });
    }
    const user = await User.findOne({
      verificationToken: token
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found!"
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    return res.status(200).json({
      message: "User successfully verified"
    });
  } catch (error) {
    res.status(400).json({
      message: "User not verified ",
      error:error.message,
      success: false
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Credentials required!"
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found!"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email, password!"
      });
    }

    const payload = {
      id: user._id,
      role: user.role
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h"
    });

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000
    };
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    res.status(400).json({
      message: "User not logged in ",
      error:error.message,
      success: false
    });
  }
};

const requestResetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found!"
      });
    }
    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

    await sendMail(
      user.email,
      "Reset password",
      "To reset your password, click the link below:",
      //send a link to frontend and use 
      `<a ${process.env.BASE_URL}/api/v1/users/reset-password/${token}</a>`
    );

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(400).json({
      message: "Error in requestResetPassword",
      error:error.message,
      success: false
    });
  }
};

const resetPasssword = async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;
  try {
    if (!password || !confirmPassword) {
      return res.status(400).json({
        message: "Credentials required!"
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "password does not match!"
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found!"
      });
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset Successfully!" });
  } catch (error) {
    res.status(400).json({
      message: "Can't reset password ",
      error:error.message,
      success: false
    });
  }
};


const getMe = async (req, res) => {
  try {
      const user = await User.findById(req.user.id).select('-password'); 
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.status(200).json({
        success:true,
        message:"Profile fetched",
      });
  } catch (error) {
      res.status(500).json({ error: 'Server error' });
  }
};



const logout = async (req,res,next)=>{
  try {
    
    res.cookie("token", "", { expires: new Date(0), httpOnly: true });

    res.status(200).json({
      success:true,
      message:"User logged Out"
    })
  } catch (error) {
    res.status(400).json({
      message: "can.t logout",
      error:error.message,
      success: false
    });
  }
}

export { register, verifyUser, login, resetPasssword, requestResetPassword, getMe, logout };
