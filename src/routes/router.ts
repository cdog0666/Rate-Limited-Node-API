import {Router} from 'express';
const router:Router = Router();

import authRouter from './auxrouters/authRouter';
import snippetsRouter from './auxrouters/snippetRouter';

router.use('/auth', authRouter);
router.use('/snippets', snippetsRouter);

export default router;