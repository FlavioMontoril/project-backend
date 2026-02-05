import jwt from "jsonwebtoken";
import dotenv from "dotenv"

const JWT_SECRET = process.env.JWT_SECRET
export class ValidationToken {
    private secretKey: string;

    constructor(secretKey: string) {
        this.secretKey = secretKey || JWT_SECRET;
    }
    validate(token: string) {
        const decoded = jwt.verify(token, this.secretKey);
        const { password, ...user } = decoded as { password?: string;[key: string]: any };
        return user;
    }
}