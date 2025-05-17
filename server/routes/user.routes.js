import express from 'express'
import { login, register, resetPasssword, verifyUser, requestResetPassword, getMe, logout } from '../controller/user.controller.js';
import { isLoggedIn } from '../middleware/user.middleware.js';
const router = express.Router();

router.post('/register', register);
router.post('/verify/:token', verifyUser);
router.post('/login', login);
router.post('/forgotPassword', requestResetPassword);
router.post('/reset-password/:token', resetPasssword);

router.get('/profile',isLoggedIn, getMe);
router.get('/logout',isLoggedIn, logout);


export default router;