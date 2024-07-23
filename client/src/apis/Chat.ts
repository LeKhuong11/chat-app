import axios from "axios";
import { ChatRequest } from "../types/chat";

class ChatApi {
    private apiUrl;

    constructor() {
        this.apiUrl = 'http://localhost:3002/api';
    }

    public async createChat({ firstId, secondId }: ChatRequest ) {
        try {
            const response = await axios.post(`${this.apiUrl}/chat/create`, {
                firstId,
                secondId
            });
            return response.data;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    public async getChats(userId: String) {
        try {
            const response = await axios.get(`${this.apiUrl}/chat/get-chat/${userId}`);
            return response.data;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }
}

export default ChatApi;