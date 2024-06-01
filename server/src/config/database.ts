import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const mongooseUri: string = process.env.MONGOOSE_URI || '';

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