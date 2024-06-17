import mongoose, { Document, Schema } from 'mongoose';
import { User } from '../Types/User';


const UserSchema: Schema = new Schema<User>(
    {
        name: { 
            type: String, 
            required: true 
        },
        email: { type: String, required: true, unique: false },
        password: { type: String, required: true, minlength: 3 }
    },
    {
        timestamps: true
    }
);

const userModel = mongoose.model<User>('User', UserSchema);

export default userModel;
