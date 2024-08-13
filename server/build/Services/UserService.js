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
const UserModel_1 = __importDefault(require("../Models/UserModel"));
const bcrypt = require('bcrypt');
class UserService {
    constructor() {
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.findOne({ email });
        });
    }
    createUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, password }) {
            const salt = yield bcrypt.genSalt(10);
            const hashedPassword = yield bcrypt.hash(password, salt);
            const newUser = new UserModel_1.default({ name, email, password: hashedPassword });
            yield newUser.save();
            return newUser.toObject();
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.findById(userId);
        });
    }
    findUsers(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.default.find({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { email: { $regex: keyword, $options: 'i' } }
                ]
            }).select('-password');
        });
    }
}
exports.default = UserService;
