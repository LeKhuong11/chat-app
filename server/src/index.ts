import express, { Express, Request, Response } from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoute from './Routes/userRoute';

dotenv.config();

const app: Express = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3002;
const mongooseUri: string = process.env.MONGOOSE_URI || '';

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

mongoose.connect(mongooseUri, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.use("/api/user", userRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to chat app API');
});
