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

    public async getMessages(req: Request, res: Response) {
        const { chatId } = req.params;
        try {
            const messages = await this.messageService.getMessages(chatId);
            return res.status(200).json(messages);
        } catch(error) {
            return res.status(500).json({ message: `Server errors: ${error}` });
        }
    }

    public async getLatesMessage(req: Request, res: Response) {
        const { chatId } = req.params;
        try {
            const message = await this.messageService.getLatestMessage(chatId);
            return res.status(200).json(message);
        } catch(error) {
            return res.status(500).json({ message: `Server errors: ${error}` });
        }
    }
}

const messageController = new MessageController();

export default messageController;