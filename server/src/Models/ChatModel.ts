import mongoose, { Schema } from "mongoose";


const ChatSchema: Schema = new Schema(
    {
        members: Array,
    },
    {
        timestamps: true
    }
)

const chatModel = mongoose.model('Chat', ChatSchema);

export default chatModel;