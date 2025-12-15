import {loginUser, logoutUser, registerUser, changePassword, refreshToken, forgotPassword} from '../controllers/auth.controller'
import { Router } from 'express';
import verifyLogin from '../middlewares/verifylogin.middleware';
const auth = Router();

auth.post('/register', registerUser);
auth.post('/login', loginUser);
auth.post('/refresh-token', refreshToken);
auth.post('/logout', verifyLogin, logoutUser);
auth.post('/change-password',verifyLogin, changePassword);
auth.post('/forgot-password',verifyLogin, forgotPassword);

export default auth;