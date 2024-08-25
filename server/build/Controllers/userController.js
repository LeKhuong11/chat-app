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
const jwtHelper_1 = __importDefault(require("../utils/jwtHelper"));
const UserService_1 = __importDefault(require("../Services/UserService"));
const validator = require('validator');
const bcrypt = require('bcrypt');
require("dotenv").config();
class UserController {
    constructor() {
        this.JWT = new jwtHelper_1.default();
        this.userService = new UserService_1.default();
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.query;
                const user = yield this.userService.getByEmail(email);
                if (user) {
                    const validPassword = yield bcrypt.compare(password, user.password);
                    if (!validPassword) {
                        return res.status(401).json({ message: 'Wrong password!' });
                    }
                    const token = this.JWT.createToken(user._id);
                    const userResponse = Object.assign(Object.assign({}, user.toObject()), { password: undefined, token });
                    res.status(200).json({ message: 'Login successfully', user: userResponse });
                }
                else {
                    res.status(401).json({ message: 'This email is not registered' });
                }
            }
            catch (error) {
                return res.status(500).json({ message: `Server errors: ${error}` });
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                if (!password || password.length < 6) {
                    return res.status(400).json({ message: 'Invalid password' });
                }
                let user = yield this.userService.getByEmail(email);
                if (user) {
                    return res.status(400).json({ message: 'User already exists!' });
                }
                if (!validator.isEmail(email)) {
                    return res.status(400).json({ message: 'Invalid email' });
                }
                const newUser = yield this.userService.createUser({ name, email, password });
                const userResponse = Object.assign(Object.assign({}, newUser), { password: undefined });
                return res.status(201).json(userResponse);
            }
            catch (error) {
                return res.status(500).json({ message: `Server errors: ${error}` });
            }
        });
    }
    findUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const keyword = req.query.keyword;
                if (!keyword) {
                    return res.status(400).json({ message: 'No data found!' });
                }
                const users = yield this.userService.findUsers(keyword);
                res.status(200).json({ users });
            }
            catch (error) {
                return res.status(500).json({ message: 'Server errors' });
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const user = yield this.userService.getUserById(userId);
                res.status(200).json({ user });
            }
            catch (error) {
                return res.status(500).json({ message: 'Server errors' });
            }
        });
    }
}
const userController = new UserController();
exports.default = userController;
