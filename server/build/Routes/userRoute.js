"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../Controllers/userController"));
const router = express_1.default.Router();
router.get('/login', (req, res) => {
    userController_1.default.login(req, res);
});
router.post('/register', (req, res) => {
    userController_1.default.register(req, res);
});
router.get('/find', (req, res) => {
    userController_1.default.findUsers(req, res);
});
router.get('/get/:userId', (req, res) => {
    userController_1.default.getUserById(req, res);
});
exports.default = router;
