import express, { Router, Request, Response } from 'express';
import MessageController from '../Controllers/messageController';

const router: Router = express.Router();

router.post('/create', (req: Request, res: Response) => {
    MessageController.createMessage(req, res);
});
router.get('/get-messages/:chatId', (req: Request, res: Response) => {
    MessageController.getMessages(req, res);
})

export default router;