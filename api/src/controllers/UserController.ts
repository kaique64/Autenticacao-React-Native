import { Request, Response } from 'express';
import User from '../models/User';

class UserController {
    async index(req: Request, res: Response) {
        const user = await User.findOne({ _id: req.userId });

        return res.status(200).json(user);
    }

    async create(req: Request, res: Response) {
        const { name, email, password } = req.body;

        const userEmail = await User.findOne({ email });

        if (userEmail) {
            return res.status(400).json('Email já cadastrado!');
        }

        const createdUser = User.create({ name, email, password });

        return res.send(createdUser);
    }
}

export default new UserController();
