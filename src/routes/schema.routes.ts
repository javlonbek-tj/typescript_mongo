import { Router } from 'express';
import { validate } from '../middleware/validate';
import { createSessionSchema } from '../schemas/session.schema';
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from '../controllers/session.controller';
import requireUser from '../middleware/requireUser';

const sessionRouter = Router();

sessionRouter.post(
  '/',
  validate(createSessionSchema),
  createUserSessionHandler
);
sessionRouter.get('/', requireUser, getUserSessionsHandler);
sessionRouter.delete('/', requireUser, deleteSessionHandler);

export default sessionRouter;
