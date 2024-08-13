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
const MessageModel_1 = __importDefault(require("../Models/MessageModel"));
class MessageService {
    createMessage(_a) {
        return __awaiter(this, arguments, void 0, function* ({ chatId, senderId, content }) {
            try {
                const message = new MessageModel_1.default({ chatId, senderId, content });
                yield message.save();
                return message.toObject();
            }
            catch (error) {
                throw error;
            }
        });
    }
    getMessages(chatId_1) {
        return __awaiter(this, arguments, void 0, function* (chatId, skip = 0, limit = 1000) {
            try {
                return yield MessageModel_1.default.find({ chatId })
                    .sort({ createdAt: 1 })
                    .skip(skip)
                    .limit(limit);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getLatestMessage(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield MessageModel_1.default.findOne({ chatId })
                    .sort({ createdAt: -1 })
                    .exec();
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = MessageService;
