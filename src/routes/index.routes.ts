import { Router } from 'express';
import userRouter from './user.routes';
import sessionRouter from './schema.routes';

const api = Router();

api.use('/users', userRouter);
api.use('/sessions', sessionRouter);

export default api;
