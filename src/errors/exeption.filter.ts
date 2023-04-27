import { NextFunction, Request, Response } from "express";
import { LoggerService } from "../logger/logger.service";
import { IExeptionFilter } from "./exeption.filter.interface";
import { HTTPError } from "./http-error.class";
import { injectable, inject } from 'inversify';
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";
import "reflect-metadata";


@injectable()
export class ExeptionFilter implements IExeptionFilter {

  constructor(@inject(TYPES.Ilogger) private logger: ILogger) {
    this.logger.log(`bind [error] ExeptionFilter`);
  }

  catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
    if (err instanceof HTTPError) {
      this.logger.error(`[${err.context}] Error ${err.statusCode} - ${err.message}`);
      res.status(err.statusCode).send({
        context: err.context,
        error: err.message
      });
    } else {
      this.logger.error(`${err.message}`);
      res.status(500).send({
        error: err.message
      });
    }   
  }
}