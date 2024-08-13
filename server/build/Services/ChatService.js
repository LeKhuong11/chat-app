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
const ChatModel_1 = __importDefault(require("../Models/ChatModel"));
const MessageModel_1 = __importDefault(require("../Models/MessageModel"));
class ChatService {
    createChat(_a) {
        return __awaiter(this, arguments, void 0, function* ({ firstId, secondId }) {
            try {
                const chat = new ChatModel_1.default({
                    members: [firstId, secondId],
                });
                return yield chat.save();
            }
            catch (error) {
                throw error;
            }
        });
    }
    getChat(_a) {
        return __awaiter(this, arguments, void 0, function* ({ firstId, secondId }) {
            try {
                return yield ChatModel_1.default.findOne({
                    members: { $all: [firstId, secondId] }
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    getChatsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ChatModel_1.default.find({
                    members: { $in: [userId] }
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteChat(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ChatModel_1.default.deleteOne({ _id: chatId });
                yield MessageModel_1.default.deleteMany({ chatId });
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = ChatService;
