import { Request, Response } from 'express';
import ChatService from '../Services/ChatService';
import { ChatParams } from '../Types/Chat';


class ChatController {
    private chatService = new ChatService();

    public async createChat(req: Request, res: Response) {
        const { firstId, secondId } = req.body as ChatParams;

        const chat = await this.chatService.getChat({firstId, secondId});
        if(chat) return res.status(200).json(chat);

        const newChat = await this.chatService.createChat({firstId, secondId});
        return res.status(200).json(newChat);
    }

    public async getChatsByUserId(req: Request, res: Response) {
        const { userId } = req.params;
        try {
            const chats = await this.chatService.getChatsByUserId(userId)
            
            return res.status(200).json(chats);
        } catch (error) {
            return res.status(500).json({ message: 'Server errors' });
        }
    }
}

const chatController = new ChatController();
export default chatController;