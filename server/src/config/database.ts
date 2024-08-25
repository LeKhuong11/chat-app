import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const mongooseUri: string = 'mongodb+srv://khuongdev11:khuongle1102@cluster0.ojyzo9r.mongodb.net/chat_app?retryWrites=true&w=majority&appName=Cluster0';

async function connectToDatabase() {
    try {
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