import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { injectable, inject } from 'inversify';
import { TYPES } from "../types";
import { ILogger } from "../logger/logger.interface";
import "reflect-metadata";


@injectable()
export class PagesController extends BaseController {  
  constructor(@inject(TYPES.Ilogger) private loggerService: ILogger) {
    super(loggerService)
    this.bindRoutes([
      {
        path: '/',
        method: 'get',
        func: this.home
      },
    ]);
  }

  // main page
  home(req: Request, res: Response, next: NextFunction) {
    this.render(res, 'home');
  }
}