import axios from "axios";

class ChatApi {
    private apiUrl;

    constructor() {
        this.apiUrl = 'http://localhost:3002/api';
    }

    public async getChats(userId: String) {
        try {
            const response = await axios.get(`${this.apiUrl}/chat/get-chats/${userId}`);
            return response.data;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }
}

export default ChatApi;