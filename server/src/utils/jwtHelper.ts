const jwt = require('jsonwebtoken');
import mongoose from 'mongoose';

require("dotenv").config();

export default class JWT {
    private jwtKey: string = process.env.JWT_SECRET_KEY || '';

    public createToken(_id: mongoose.Types.ObjectId) {
        return jwt.sign({ _id }, this.jwtKey, { expiresIn: '1d' });
    }

    public verifyToken(token: string) {
        return jwt.verify(token, this.jwtKey);
    }
}