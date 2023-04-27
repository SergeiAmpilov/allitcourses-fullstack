import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";


export class PagesController extends BaseController {  
  constructor(logger: LoggerService) {
    super(logger)
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