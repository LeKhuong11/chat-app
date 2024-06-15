import userModel from '../Models/UserModel';
import { User } from '../Types/User';
const bcrypt = require('bcrypt');



class UserService {
    
    constructor() {

    }

    public async getByEmail(email: string) {
        return await userModel.findOne({ email });
    }

    public async createUser({ name, email, password }: User) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({ name, email, password: hashedPassword });
        await newUser.save();
        return newUser.toObject();
    }
}

export default UserService;