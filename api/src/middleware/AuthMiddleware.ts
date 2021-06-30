import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface IMiddleware {
    id: string,
    iat: number,
    exp: number
  }

export default function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(400).json('JWT expirado ou inexistente!');
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
        const data = jwt.verify(token, process.env.SECRET as string);
        
        const { id } = data as IMiddleware;

        req.userId = id;

        return next();
    } catch {
        if (jwt.JsonWebTokenError) {
            return res.status(400).json({ msg: 'JWT inválido' });
        }
      
        return res.status(400).json('Erro no servidor!');
    }
}