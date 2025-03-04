import express, { Express } from 'express';
import env from 'dotenv';
import 'tsconfig-paths/register';
import bodyParser from 'body-parser';
import cors from 'cors';
import v1Route from '@routes/index.route';
import { connect } from '@config/database';

env.config();

connect();

const app: Express = express();
const PORT: number | string = process.env.PORT || 4425;

// app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000', // Chỉ định rõ nguồn được phép
    credentials: true, // Cho phép gửi cookie hoặc authentication headers
}));

app.use(bodyParser.json());

v1Route(app);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
