import { Server as SocketIOServer } from 'socket.io';
import http from 'http';

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
            
        io.on('connection', (socket) => {

            socket.on('message', ({room, newMessage}) => {
                socket.to(room).emit('message', {
                    room: room,
                    newMessage: newMessage,
                });
            })

            socket.on('joinRoom', (room) => {
                socket.join(room);
            });

            socket.on('disconnect', () => {
                console.log('User disconnected:', socket.id);
            });
        })
    }
}

export default Socket;