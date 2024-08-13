"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatControler_1 = __importDefault(require("../Controllers/chatControler"));
const router = express_1.default.Router();
router.post('/create', (req, res) => {
    chatControler_1.default.createChat(req, res);
});
router.get('/get-chat/:userId', (req, res) => {
    chatControler_1.default.getChatsByUserId(req, res);
});
router.get('/find', (req, res) => {
    chatControler_1.default.findChat(req, res);
});
router.delete('/delete/:chatId', (req, res) => {
    chatControler_1.default.deleteChat(req, res);
});
exports.default = router;
