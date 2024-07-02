import chatModel from "../Models/ChatModel";

class ChatService {

    public async createChat(ids: string[]) {
        try {

        } catch(error) {
            throw error;
        }
    }

    public async getChatByUserId({firstId, SecondId}: ) {
        return await chatModel.findOne({
            members: {$all: [firstId, SecondId]}
        })
    }
}

export default ChatService;