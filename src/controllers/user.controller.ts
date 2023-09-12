import { CreateUserInput } from './../schemas/user.schema';
import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { createUser, findUser } from '../service/user.service';

export const createdUserHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const existingUser = await findUser({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send('User in use');
    }
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e) {
    logger.error(e);
  }
};
