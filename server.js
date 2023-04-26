const express = require('express');
const { config } = require('dotenv');
const dbConnect = require('./dbConnect.js');
const authRoutes = require('./routes/auth.js');
const refreshTokenRoutes = require('./routes/refreshToken.js');
const userRoutes = require('./routes/users.js');
const customerRoutes = require('./routes/customer.js');
const cors = require('cors');
const auth = require('./middleware/auth.js');

const app = express();

config();
dbConnect();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/refreshToken', refreshTokenRoutes);
app.use('/api/users', userRoutes);
app.use('/api/customers', auth, customerRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
