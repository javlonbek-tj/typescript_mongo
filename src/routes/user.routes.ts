import { Router } from 'express';
import { createdUserHandler } from './../controllers/user.controller';
import { validate } from '../middleware/validate';
import { createUserSchema } from '../schemas/user.schema';

const userRouter = Router();

userRouter.post('/', validate(createUserSchema), createdUserHandler);

export default userRouter;
