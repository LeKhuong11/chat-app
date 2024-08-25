import axios from "axios";
import { ChatRequest } from "../types/chat";

class ChatApi {
    private apiUrl;

    constructor() {
        this.apiUrl = 'http://222.255.238.163:4000/api';
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

    public async getChats(userId: string) {
        try {
            const response = await axios.get(`${this.apiUrl}/chat/get-chat/${userId}`);
            return response.data;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    public async findChat({ firstId, secondId }: ChatRequest) {
        try {
            const response = await axios.post(`${this.apiUrl}/chat/find`, {
                firstId,
                secondId
            });
            return response.data;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    public async deleteChat(chatId: string) {
        try {
            const response = await axios.delete(`${this.apiUrl}/chat/delete/${chatId}`);
            return response.data;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }
}

export default ChatApi;