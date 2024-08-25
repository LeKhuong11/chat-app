import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function connectToDatabase() {
    try {
        const mongooseUri: string = 'mongodb+srv://khuongdev11:khuongle1102@cluster0.ojyzo9r.mongodb.net/chat_app?retryWrites=true&w=majority&appName=Cluster0';
        mongoose.connect(mongooseUri, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
            .then(() => {
                console.log('Connected to MongoDB');
            })
            .catch((err) => {
                console.error('Error connecting to MongoDB: ', err);
            });
    } catch {

    }
}

export default connectToDatabase;