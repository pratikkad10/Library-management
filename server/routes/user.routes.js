import express from 'express'
import { login, register, resetPasssword, verifyUser, requestResetPassword, getMe, logout } from '../controller/user.controller.js';
import { isLoggedIn } from '../middleware/user.middleware.js';
const router = express.Router();
import {uploadImageToCloudinary} from '../controller/fileUpload.js'
router.post('/register', register);
router.post('/verify/:token', verifyUser);
router.post('/login', login);
router.post('/forgotPassword', requestResetPassword);
router.post('/reset-password/:token', resetPasssword);

router.get('/profile',isLoggedIn, getMe);
router.get('/logout',isLoggedIn, logout);

//for single image upload call uploadImageToCloudinary function in controller it will return secure URL

//upload multiple images 
router.post('/upload', async(req,res)=>{
    const files = req.files.files;
    console.log(files);
    const uploadedFiles = [];

    for (const file of files) {
      const result = await uploadImageToCloudinary(file.tempFilePath, {
        folder: "multiple-images",
      });
      uploadedFiles.push(result); // Save URL to array
    }
    
    res.status(200).json({
      message:true,
      uploadedFiles
    })
})


export default router;