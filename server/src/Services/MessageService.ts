import messageModel from "../Models/messageModel";
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
}

export default MessageService;