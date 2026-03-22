import {Router} from 'express';
const router:Router = Router();

import authRouter from './authRouter';

router.use('/auth', authRouter);

export default router;