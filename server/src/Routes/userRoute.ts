import express, { Router, Request, Response } from 'express';
import userController from '../Controllers/UserController';

const router: Router = express.Router();


router.get('/login', (req: Request, res: Response) => {
    userController.login(req, res)
});

router.post('/register', (req: Request, res: Response) => {
    userController.register(req, res);
});

router.get('/search', userController.searchUsers);

export default router;