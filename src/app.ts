import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { handleAppErrorMiddleware } from './middlewares/handleAppError.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use(handleAppErrorMiddleware);

export default app;
