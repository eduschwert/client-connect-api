import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import swaggerDocs from './swagger.json';
import swaggerUi from 'swagger-ui-express';

import handleAppErrorMiddleware from './middlewares/global/handleAppError.middleware';
import loginRoutes from './routes/login.routes';
import usersRoutes from './routes/users.routes';
import contactsRoutes from './routes/contacts.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/login', loginRoutes);
app.use('/users', usersRoutes);
app.use('/contacts', contactsRoutes);

app.use(handleAppErrorMiddleware);

export default app;
