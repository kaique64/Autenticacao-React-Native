import app from './app';
import { config } from 'dotenv';

config();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
})

