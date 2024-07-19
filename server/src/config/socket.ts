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

            socket.on('message', (data) => {
                console.log(data);
                io.to(data.room).emit('message', {
                    room: data.room,
                    newMessage: data.newMessage,
                });
            })
                
            socket.on('joinRoom', (room) => {
                socket.join(room)
                console.log(`User ${socket.id} joined room: ${room}`);
            });

            socket.on('disconnect', () => {
                console.log('User disconnected:', socket.id);
            });
        })
    }
}

export default Socket;