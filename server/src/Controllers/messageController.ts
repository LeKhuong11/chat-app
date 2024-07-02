import { Request, Response } from 'express';
import { Message } from "../Types/Message";
import MessageService from '../Services/MessageService';

class MessageController {
    private messageService = new MessageService();
    constructor() {

    }

    public async createMessage(req: Request, res: Response) {
        try {
            const { chatId, senderId, content } = req.body as Message;

            const message = await this.messageService.createMessage({chatId, senderId, content});
            
            return res.status(200).json(message);
        } catch (error) {
            return res.status(500).json({ message: `Server errors: ${error}` });
        }
    }

    public async getMessage(req: Request, res: Response) {
        try {
            
        } catch(error) {
            return res.status(500).json({ message: `Server errors: ${error}` });
        }
    }
}

const messageController = new MessageController();

export default messageController;