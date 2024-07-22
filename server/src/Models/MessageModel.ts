import mongoose, { Schema } from "mongoose";
import { Message } from "../Types/Message";


const MessageSchema: Schema = new Schema(
    {
        chatId: {
            type: String,
            require: true
        },
        senderId: {
            type: String,
            require: true
        },
        content: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true
    }
);

const messageModel = mongoose.model<Message>('Message', MessageSchema);

export default messageModel;