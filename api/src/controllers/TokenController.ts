import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';

class TokenController {
    async auth(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json('Email não encontrado!');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(400).json('Senha incorreta!');
        }

        const token = jwt.sign({ id: user.id }, process.env.SECRET as string, {
            expiresIn: '7d',
        });
    
        return res.status(200).json({ user, token });
    }
}

export default new TokenController();
