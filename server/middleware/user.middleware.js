import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const isLoggedIn = async (req, res, next)=>{
    
    try {        
        const token = req.cookies?.token;
        if(!token){
            return res.status(400).json({
                success:false,
                message:"Token not found!"
            })
        }

        const decode= jwt.verify(token, process.env.JWT_SECRET);
        if(!decode){
            return res.status(400).json({
                success:false,
                message:"Token not verified!"
            })
        } 

        req.user=decode;
        next();
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Token not verified!",
            error:error.message
        })
    }
}

const isStudent = async (req, res, next)=>{
    try {
        const {user} = req;
        if(user.role !== "student"){
            return res.status(400).json({
                success:false,
                message:"You are not a student!"
            })
        }
        next();
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"You are not a student!",
            error:error.message
        })
    }
}

const isStaff = async (req, res, next)=>{
    try {
        const {user} = req;
        if(user.role !== "staff"){
            return res.status(400).json({
                success:false,
                message:"You are not a staff!"
            })
        }
        next();
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"You are not a staff!",
            error:error.message
        })
    }
}

const isAdmin = async (req, res, next)=>{
    console.log("isAdmin middleware");
    
    try {
        const {user} = req;
        console.log(user);
        if(user.role !== "admin"){
            return res.status(400).json({
                success:false,
                message:"You are not an admin!"
            })
        }
        next();
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"You are not an admin!",
            error:error.message
        })
    }
}


export {isLoggedIn, isStudent, isStaff, isAdmin}