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
const MessageService_1 = __importDefault(require("../Services/MessageService"));
class MessageController {
    constructor() {
        this.messageService = new MessageService_1.default();
    }
    createMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { chatId, senderId, content } = req.body;
                const message = yield this.messageService.createMessage({ chatId, senderId, content });
                return res.status(200).json(message);
            }
            catch (error) {
                return res.status(500).json({ message: `Server errors: ${error}` });
            }
        });
    }
    getMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { chatId } = req.params;
            try {
                const messages = yield this.messageService.getMessages(chatId);
                return res.status(200).json(messages);
            }
            catch (error) {
                return res.status(500).json({ message: `Server errors: ${error}` });
            }
        });
    }
    getLatesMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { chatId } = req.params;
            try {
                const message = yield this.messageService.getLatestMessage(chatId);
                return res.status(200).json(message);
            }
            catch (error) {
                return res.status(500).json({ message: `Server errors: ${error}` });
            }
        });
    }
}
const messageController = new MessageController();
exports.default = messageController;
