import {Router} from 'express';
const router:Router = Router();

import authRouter from './authRouter';
import snippetsRouter from './snippetRouter';

router.use('/auth', authRouter);
router.use('/snippets', snippetsRouter);

export default router;