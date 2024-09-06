import axios from "axios";
import { MessageRequest } from "../types/message";

class MessageApi {
    private apiUrl: string;

    constructor() {
        this.apiUrl = process.env.REACT_APP_API_URL;
    }

    public async sendMessage({message, userId, chatId}: MessageRequest) {
        try {
            const response = await axios.post(`${this.apiUrl}/message/create`, {
                content: message,
                senderId: userId,
                chatId
            })
            return response.data;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    public async getMessage(id: string) {
        try {
            const response = await axios.get(`${this.apiUrl}/message/get-message/${id}`);
            return response.data;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    public async getLatestMessage(chatId: string) {
        try {
            const response = await axios.get(`${this.apiUrl}/message/get-latest-message/${chatId}`);
            return response.data;
        } catch(error) {
            throw error;
        }
    }
}

export default MessageApi;