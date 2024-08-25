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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mongooseUri = 'mongodb+srv://khuongdev11:khuongle1102@cluster0.ojyzo9r.mongodb.net/chat_app?retryWrites=true&w=majority&appName=Cluster0';
            mongoose_1.default.connect(mongooseUri, { useNewUrlParser: true, useUnifiedTopology: true })
                .then(() => {
                console.log('Connected to MongoDB');
            })
                .catch((err) => {
                console.error('Error connecting to MongoDB: ', err);
            });
        }
        catch (_a) {
        }
    });
}
exports.default = connectToDatabase;
