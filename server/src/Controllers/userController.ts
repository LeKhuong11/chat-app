import { Request, Response } from 'express';
import userModel from '../Models/UserModel';
import JWT from "../Utils/jwtHelper";
import UserService from '../Services/UserService';
import { User, UserLogin } from '../Types/User';
const validator = require('validator');
const bcrypt = require('bcrypt');
require("dotenv").config();


class UserController {
    private JWT = new JWT();
    private userService = new UserService();
    
    constructor() {
        
    }

    
    public async login (req: Request, res: Response) {
        try {
            const { email, password } = req.query as UserLogin;
            
            const user = await this.userService.getByEmail(email);

            if(user) {
                const validPassword = await bcrypt.compare(password, user.password);
                
                if(!validPassword) {
                    return res.status(401).json({ message: 'Wrong password!'}); 
                }
                const token = this.JWT.createToken(user._id.toString());
                    
                const userResponse = {  
                    ...user.toObject(), 
                    password: undefined,
                    token
                };
    
                res.status(200).json({ message: 'Login successfully', user: userResponse})
            } else {
                res.status(401).json({message: 'This email is not registered'})
            }
            
        } catch (error) {
            return res.status(500).json({ message: `Server errors: ${error}` });
        }
    }

    public async register(req: Request, res: Response) {
        try {
            const { name, email, password } = req.query as User;

            if (typeof password !== 'string' || password.length < 6) {
                return res.status(400).json({ message: 'Invalid password' });
            }

            let user = await this.userService.getByEmail(email);
            
            if (user) {
                return res.status(400).json({ message: 'User already exists!' });
            }
    
            if (!validator.isEmail(email)) {
                return res.status(400).json({ message: 'Invalid email' });
            }

            const newUser = await this.userService.createUser({name, email, password});
    
            const userResponse = { 
                ...newUser,
                password: undefined,
            };
    
            return res.status(201).json(userResponse);
        } catch (error) {
            return res.status(500).json({ message: `Server errors: ${error}` });
        }
    }

    public async searchUsers(req: Request, res: Response) {
        try {
            const { keyword } = req.query;

            const users = await userModel.find({ 
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { email: { $regex: keyword, $options: 'i' } }
                ]
             }).select('-password');

            res.status(200).json({users});
        } catch (error) {
            return res.status(500).json({ message: 'Server errors' });
        }
    }
}


const userController = new UserController();

export default userController;
