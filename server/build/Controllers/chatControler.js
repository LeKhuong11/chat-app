"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChatService_1 = __importDefault(require("../Services/ChatService"));
class ChatController {
    constructor() {
        this.chatService = new ChatService_1.default();
    }
    createChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstId, secondId } = req.body;
            const chat = yield this.chatService.getChat({ firstId, secondId });
            if (chat)
                res.status(200).json(chat);
            const newChat = yield this.chatService.createChat({ firstId, secondId });
            res.status(200).json(newChat);
        });
    }
    findChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstId, secondId } = req.body;
            const chat = yield this.chatService.getChat({ firstId, secondId });
            if (chat)
                res.status(200).json(chat);
            res.status(200).json({ message: 'Not found chat!' });
        });
    }
    getChatsByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            try {
                const chats = yield this.chatService.getChatsByUserId(userId);
                return res.status(200).json(chats);
            }
            catch (error) {
                return res.status(500).json({ message: 'Server errors' });
            }
        });
    }
    deleteChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const chatId = req.params.chatId;
            try {
                const isDeleteChat = yield this.chatService.deleteChat(chatId);
                if (!isDeleteChat) {
                    res.status(500).json({ status: false, message: 'Conversation deletion failed' });
                }
                res.status(200).json({ status: true, message: 'Successfully deleted chat' });
            }
            catch (error) {
                res.status(500).json({ message: 'Server errors' });
            }
        });
    }
}
const chatController = new ChatController();
exports.default = chatController;
