import {Router} from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { createSnippetController } from '../controllers/snippetsController';

const router:Router = Router();

router.use(authMiddleware);

router.post('', createSnippetController);

router.get('/:id', (req, res) => {
    res.send(`Get snippet with id ${req.params.id}`);
});

router.get('', (req, res) => {
    res.send('Get all snippets');
});

router.patch('/:id', (req, res) => {
    res.send(`Update snippet with id ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`Delete snippet with id ${req.params.id}`);
});

router.post('/:id/tags', (req, res) => {
    res.send(`Add tags to snippet with id ${req.params.id}`);
});



export default router;