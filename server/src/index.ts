import express, { Express, Request, Response } from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoute from './Routes/userRoute';
import connectToDatabase from './config/database';
import Socket from './config/socket';


const app: Express = express();
const server = http.createServer(app);
const socket = new Socket(server);
const PORT = process.env.PORT || 3002;
dotenv.config();


app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());

const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
  }
});

server.listen(PORT, () => {
  connectToDatabase();
  socket.connect();
  console.log(`Server listening on port ${PORT}`);
});

app.use("/api/user", userRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to chat app API');
});
