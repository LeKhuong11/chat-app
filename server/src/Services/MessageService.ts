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

    public async getMessages(chatId: string) {
        try {
            return await messageModel.find({ chatId });
        } catch(error) {
            throw error;
        }
    }
}

export default MessageService;