import chatModel from "../Models/ChatModel";
import messageModel from "../Models/MessageModel";
import { ChatParams } from "../Types/Chat";

class ChatService {

    public async createChat({firstId, secondId}: ChatParams) {
        try {
            const chat = new chatModel({
                members: [firstId, secondId],
            });
            
            return await chat.save();
        } catch(error) {
            throw error;
        }
    }

    public async getChat({firstId, secondId}: ChatParams) {
        try {
            
            return await chatModel.findOne({
                members: {$all: [firstId, secondId]}
            })
        } catch(error) {
            throw error;
        }
    }

    public async getChatsByUserId(userId: string) {
        try {
            return await chatModel.find({
                members: {$in: [userId]}
            })
        } catch(error) {
            throw error;
        }
    }

    public async deleteChat(chatId: string) {
        try {
            await chatModel.deleteOne({_id: chatId});
            await messageModel.deleteMany({chatId});
            
            return true;
        } catch(error) {
            throw error;
        }
    }
}

export default ChatService;