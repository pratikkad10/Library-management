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
    // next(); 
}

export {isLoggedIn}