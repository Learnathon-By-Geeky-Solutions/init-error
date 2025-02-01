import { Router } from 'express'
import { signup } from '../controllers/auth-controllers'


const router = Router();

router.route('/add-new-user').post(signup);


export default router;