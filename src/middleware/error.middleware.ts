import { NextFunction, Request, Response } from 'express';
import * as winston from 'winston';
import HttpException from '../exceptions/HttpException';

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  winston.error(error);
  response.status(status).send({
    message,
    status,
  });
}

export default errorMiddleware;
