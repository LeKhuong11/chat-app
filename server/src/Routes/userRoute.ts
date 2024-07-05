import express, { Router, Request, Response } from 'express';
import userController from '../Controllers/userController';

const router: Router = express.Router();


router.get('/login', (req: Request, res: Response) => {
    userController.login(req, res)
});

router.post('/register', (req: Request, res: Response) => {
    userController.register(req, res);
});

router.get('/find', (req: Request, res: Response) => {
    userController.findUsers(req, res);
});

router.get('/get/:userId', (req: Request, res: Response) => {
    userController.getUserById(req, res);
});

export default router;