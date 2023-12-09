import { Request, Response } from 'express';
import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from 'routing-controllers';
import { Service } from 'typedi';
import { CustomError } from '../shared/customError';
import { ValidationError } from 'class-validator';
import logger from '../shared/logger';

interface errorResponse {
  code: number,
  message: string,
  details?: Record<string, string[]>
}

@Service()
@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(err: any, req: Request, res: Response) {
    logger.error(err);
    let responseObj: errorResponse
    let statusCode: number
    if ('errors' in err && Array.isArray(err.errors) && err.errors.every((e: any) => e instanceof ValidationError)) {
      statusCode = 400
      responseObj= {
        code: 400,
        message: 'Invalid request schema',
        details: this.mapValidationErrors(err.errors as ValidationError[]),
      }
    } else if (err instanceof CustomError || err instanceof HttpError) {
      statusCode = err.httpCode
      responseObj = {
        code: err.httpCode,
        message: err.message,
      }
    } else {
      statusCode = 500
      responseObj = {
        code: 500,
        message: 'Unexpected error',
      };
    }
    res.status(statusCode).json(responseObj);
  }

  private mapValidationErrors(errors: ValidationError[]): Record<string, string[]> {
    const result: Record<string, string[]> = {};
    errors.forEach(error => {
      const property = error.property;
      result[property] = Object.values(error.constraints || {});
    });

    return result;
  }
}
