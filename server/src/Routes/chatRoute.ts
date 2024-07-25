import express, { Request, Response, Router } from "express";
import ChatController from "../Controllers/chatControler";

const router: Router = express.Router();

router.post('/create', (req: Request, res: Response) => {
    ChatController.createChat(req, res);
});
router.get('/get-chat/:userId', (req: Request, res: Response) => {
    ChatController.getChatsByUserId(req, res);
});
router.delete('/delete/:chatId', (req: Request, res: Response) => {
    ChatController.deleteChat(req, res);
});

export default router;