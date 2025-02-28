import { Router } from 'express'
import { login, logout, signup, verifyEmail } from '../controllers/auth-controllers'
import { verifyJWT } from '../middleware/auth-middleware';


const router = Router();


router.route('/signup').post(signup);
router.route("/signin").post(login);
router.route("/signout").post(verifyJWT, logout);
router.route('/email-verification').post(verifyEmail);


export default router; 