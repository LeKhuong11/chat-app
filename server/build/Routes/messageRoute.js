"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_1 = __importDefault(require("../Controllers/messageController"));
const router = express_1.default.Router();
router.post('/create', (req, res) => {
    messageController_1.default.createMessage(req, res);
});
router.get('/get-message/:chatId', (req, res) => {
    messageController_1.default.getMessages(req, res);
});
router.get('/get-latest-message/:chatId', (req, res) => {
    messageController_1.default.getLatesMessage(req, res);
});
exports.default = router;
