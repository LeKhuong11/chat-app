"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
class Socket {
    constructor(server) {
        this.server = server;
        this.io = new socket_io_1.Server(this.server);
    }
    connect() {
        const io = new socket_io_1.Server(this.server, {
            cors: {
                origin: "*",
            }
        });
        let onlineUsers = [];
        io.on('connection', (socket) => {
            socket.on('message', ({ newMessage, recipientId }) => {
                const user = onlineUsers.find((user) => user.userId === recipientId);
                if (user) {
                    io.to(user.socketId).emit('message', newMessage);
                    io.to(user.socketId).emit('notification', {
                        isReadMessage: false,
                        senderId: newMessage.senderId,
                        date: new Date()
                    });
                }
            });
            socket.on('addUserOnline', (userId) => {
                !onlineUsers.some((user) => user.userId === userId) &&
                    onlineUsers.push({
                        userId,
                        socketId: socket.id
                    });
                io.emit('getUserOnlines', onlineUsers);
            });
            socket.on('disconnect', () => {
                onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
                io.emit('getUserOnlines', onlineUsers);
            });
        });
    }
}
exports.default = Socket;
