import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
import { OnlineUsers } from '../Types/User';

class Socket {
    private server: http.Server;
    private io: SocketIOServer;

    constructor(server: http.Server) {
        this.server = server;
        this.io = new SocketIOServer(this.server);
    }

    connect() {
        
        const io = new SocketIOServer(this.server, {
            cors: {
                origin: "*",
            }
        });

        let onlineUsers: OnlineUsers[] = [];
            
        io.on('connection', (socket) => {

            socket.on('message', ({newMessage, recipientId}) => {
                const user = onlineUsers.find((user) => user.userId === recipientId);

                if(user) {
                    io.to(user.socketId).emit('message', newMessage)

                    io.to(user.socketId).emit('notification', {
                        isReadMessage: false,
                        senderId: newMessage.senderId,
                        date: new Date()
                    });
                }
            })  

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
        })
    }
}

export default Socket;