import express, { Router, Request, Response } from 'express';
import MessageController from '../Controllers/messageController';

const router: Router = express.Router();

router.post('/create', (req: Request, res: Response) => {
    MessageController.createMessage(req, res);
});
router.get('/get-message/:chatId', (req: Request, res: Response) => {
    MessageController.getMessages(req, res);
})

router.get('/get-latest-message/:chatId', (req: Request, res: Response) => {
    MessageController.getLatesMessage(req, res);
})

export default router;