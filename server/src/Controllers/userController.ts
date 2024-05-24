import express, { Request, Response } from 'express';
const validator = require('validator');
const bcrypt = require('bcrypt');
import userModel from '../Models/UserModel';

const userController = {
    register: async (req: Request, res: Response) => {
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
    
            const userResponse = { ...user.toObject(), password: undefined };
    
            return res.status(201).json(userResponse);
        } catch (error) {
            return res.status(500).json({ message: 'Server errors' });
        }
    },

    login: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const user = await userModel.findOne({ email });

            console.log(user);
            

            if(user) {
                const validPassword = await bcrypt.compare(password, user.password);

                if(!validPassword) {
                    return res.status(401).json({ message: 'Wrong password!'}); 
                }
                const userResponse = { ...user.toObject(), password: undefined };

                res.status(200).json({ message: 'Login successfully', user: userResponse})
            } else {
                res.status(401).json({message: 'This email is not registered'})
            }
            
        } catch (error) {
            return res.status(500).json({ message: 'Server errors' });
        }
    }
};

export default userController;
