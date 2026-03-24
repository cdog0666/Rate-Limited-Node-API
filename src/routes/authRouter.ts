import {Router} from 'express';
import { signUpController, loginController } from '../controllers/authController';

const router:Router = Router();

router.post('/signup', signUpController);

router.post('/login', loginController);

export default router;