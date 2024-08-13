"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
require("dotenv").config();
class JWT {
    constructor() {
        this.jwtKey = process.env.JWT_SECRET_KEY || '';
    }
    createToken(_id) {
        return jwt.sign({ _id }, this.jwtKey, { expiresIn: '1d' });
    }
    verifyToken(token) {
        return jwt.verify(token, this.jwtKey);
    }
}
exports.default = JWT;
