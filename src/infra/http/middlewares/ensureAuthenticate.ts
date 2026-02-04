import { NextFunction, Response } from "express";
import { CustomRequest } from "@/infra/http/express/types/custom-request.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET as string

export function ensureAuthenticated(req: CustomRequest, res: Response, next: NextFunction) {
    //RECEBE TOKEN VIA HEADER
    const authHeader = req.headers.authorization;
    //RECEBE TOKEN VIA COOKIES
    // const token = req.cookies?.token;

    if (!authHeader) {
        res.status(401).json({ message: "Token Not Provider" })
        return
    }

    //RECEBE TOKEN VIA HEADER, SE USAR COOKIES RETIRAR ESTE
    const [, token] = authHeader.split(" ");

    if (!token) {
        res.status(401).json({ error: 'Token not provider' })
        return;
    }

    if (!JWT_SECRET) {
        res.status(500).json({ error: 'Internal Server Error' })
        return;
    }

    try {

        const decoded = jwt.verify(token, JWT_SECRET)
        const { password, ...userWithouPassword } = decoded as Record<string, any>
        req.user = userWithouPassword;
        next();

    } catch (error) {
        console.log("ERRO JWT:", error.name, error.message);
        res.status(401).json({ message: 'Invalid Token' })
    }

}