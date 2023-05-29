import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';

import handleAppErrorMiddleware from './middlewares/handleAppError.middleware';
import loginRoutes from './routes/login.routes';
import usersRoutes from './routes/users.routes';
import contactsRoutes from './routes/contacts.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/login', loginRoutes);
app.use('/users', usersRoutes);
app.use('/contacts', contactsRoutes);

app.use(handleAppErrorMiddleware);

export default app;
