import type { NextFunction, Response } from "express";
import type { CustomRequest } from "../express/types/custom-request.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET as string

export function ensureAuthenticated(req: CustomRequest, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization;
    if(!authHeader){
        res.status(401).json({message: "Token Not Provider"})
        return
    }

    const [, token] = authHeader.split(" ");

     if (!token) {
        res.status(401).json({ error: 'Token not provider' })
        return;
    }

        if (!JWT_SECRET) {
        res.status(500).json({ error: 'Internal Server Error' })
        return;
    }

    try{

        const decoded = jwt.verify(token, JWT_SECRET)
        const {password, ...userWithouPassword} = decoded as Record<string, any>
        req.user = userWithouPassword;
        next();

    }catch(error){
        res.status(401).json({message: 'Invalid Token'})
    }

}