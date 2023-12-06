import { Request, Response } from 'express';
import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from 'routing-controllers';
import { Service } from 'typedi';
import { CustomError } from '../shared/customError';
import logger from '../shared/logger';

@Service()
@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(err: Error, req: Request, res: Response) {
    logger.error(err);
    if (err instanceof CustomError || err instanceof HttpError) {
      res.status(err.httpCode).json({
        code: err.httpCode,
        message: err.message
      });
    } else {
      res.status(500).json({
        code: 'Internal Server Error',
        message: 'Unexpected error',
      });
    }
  }
}
