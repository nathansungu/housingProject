import {loginUser, logoutUser, registerUser, changePassword, refreshToken, forgotPassword, logedInUser} from '../controllers/auth.controller'
import { Router } from 'express';
import verifyLogin from '../middlewares/verifylogin.middleware';
const auth = Router();

auth.post('/register', registerUser);
auth.post('/login', loginUser);
auth.post('/refresh', refreshToken);
auth.get('/me', verifyLogin, logedInUser);
auth.post('/logout', verifyLogin, logoutUser);
auth.patch('/password',verifyLogin, changePassword);
auth.post('/forgot-password',verifyLogin, forgotPassword);

export default auth;