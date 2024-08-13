"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoute_1 = __importDefault(require("./Routes/userRoute"));
const chatRoute_1 = __importDefault(require("./Routes/chatRoute"));
const messageRoute_1 = __importDefault(require("./Routes/messageRoute"));
const database_1 = __importDefault(require("./config/database"));
const socket_1 = __importDefault(require("./Socket/socket"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const socket = new socket_1.default(server);
const PORT = process.env.PORT || 4000;
dotenv_1.default.config();
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express_1.default.json());
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    }
});
server.listen(PORT, () => {
    (0, database_1.default)();
    socket.connect();
    console.log(`Server listening on port ${PORT}`);
});
app.use("/api/user", userRoute_1.default);
app.use("/api/chat", chatRoute_1.default);
app.use("/api/message", messageRoute_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to chat app API');
});
