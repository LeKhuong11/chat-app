import messageModel from "../Models/MessageModel";
import { Message } from "../Types/Message";


class MessageService {

    public async createMessage({ chatId, senderId, content }: Message) {
        try {
            const message = new messageModel({chatId, senderId, content});
            await message.save();
    
            return message.toObject();
        } catch(error) {
            throw error;
        }
    }

    public async getMessages(chatId: string, skip: number = 0, limit: number = 100) {
        try {
            return await messageModel.find({ chatId })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);
        } catch(error) {
            throw error;
        }
    }
}

export default MessageService;