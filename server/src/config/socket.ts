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
            socket.emit("message", {
                room: '123',
                message: 'Hello world!!!!!'
            });

            socket.on('message', (data) => {
                console.log(data);
                socket.broadcast.emit('message', data)
            })
        })

        console.log('Connected socket: ', io);
    }
}

export default Socket;