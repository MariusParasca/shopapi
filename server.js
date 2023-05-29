import express from 'express';
import { config } from 'dotenv';
import dbConnect from './dbConnect.js';
import authRoutes from './routes/auth.js';
import refreshTokenRoutes from './routes/refreshToken.js';
import userRoutes from './routes/users.js';
import customerRoutes from './routes/customer.js';
import cors from 'cors';
import auth from './middleware/auth.js';

const app = express();

config();
dbConnect();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/refreshToken', refreshTokenRoutes);
app.use('/api/users', userRoutes);
app.use('/api/customers-with-auth', auth, customerRoutes);
app.use('/api/customers', customerRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
