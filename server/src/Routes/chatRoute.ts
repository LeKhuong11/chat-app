import express, { Request, Response, Router } from "express";
import ChatController from "../Controllers/chatControler";

const router: Router = express.Router();

router.post('/create', (req: Request, res: Response) => {
    ChatController.createChat(req, res);
});
router.get('/get-chats/:userId', (req: Request, res: Response) => {
    ChatController.getChatsByUserId(req, res);
});

export default router;