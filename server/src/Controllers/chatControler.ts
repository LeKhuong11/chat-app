:import { Request, Response } from 'express';


class ChatController {
    
    public async createChat(req: Request, res: Response) {
        const { firstId, secondId } = req.body;

    }
}

const chatController = new ChatController();
export default chatController;