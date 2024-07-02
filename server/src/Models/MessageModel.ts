import mongoose, { Schema } from "mongoose";
import { Message } from "../Types/Message";


const MessageSchema: Schema = new Schema(
    {
        chatId: String,
        senderId: String,
        content: String
    },
    {
        timestamps: true
    }
);

const messageModel = mongoose.model<Message>('Message', MessageSchema);

export default messageModel;