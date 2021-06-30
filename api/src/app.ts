import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import route from './routes';

config();

const app = express();
const url = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.4acge.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

app.use(express.json());
app.use(route);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('MongoDB Atlas connected with success');
})

export default app;
