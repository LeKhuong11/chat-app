import { Request, Response } from 'express';
import userModel from '../models/UserModel';
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
    static createToken(_id: string) {
        const jwtKey = process.env.JWT_SECRET_KEY;
        return jwt.sign({_id}, jwtKey, {expiresIn: '1d'});
    }

    static async register(req: Request, res: Response) {
        try {
            const { name, email, password } = req.query; 

            if (typeof password !== 'string' || password.length < 6) {
                return res.status(400).json({ message: 'Invalid password' });
            }

            let user = await userModel.findOne({ email });
            if (user) {
                return res.status(400).json({ message: 'User already exists!' });
            }
    
            if (!validator.isEmail(email)) {
                return res.status(400).json({ message: 'Invalid email' });
            }

            user = new userModel({ name, email, password });
            
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
    
            await user.save();
    
            const userResponse = { 
                ...user.toObject(), 
                password: undefined,
            };
    
            return res.status(201).json(userResponse);
        } catch (error) {
            return res.status(500).json({ message: 'Server errors' });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.query;
            
            const user = await userModel.findOne({ email });
            
            if(user) {
                const validPassword = await bcrypt.compare(password, user.password);

                if(!validPassword) {
                    return res.status(401).json({ message: 'Wrong password!'}); 
                }
                const token = UserController.createToken(user._id as string);

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
            return res.status(500).json({ message: 'Server errors' });
        }
    }

    static async searchUsers(req: Request, res: Response) {
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

export default UserController;
