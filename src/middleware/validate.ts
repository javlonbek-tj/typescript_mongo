import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        params: req.params,
        query: req.query,
        body: req.body,
      });
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).send(err.errors);
      }
      next(err);
    }
  };
