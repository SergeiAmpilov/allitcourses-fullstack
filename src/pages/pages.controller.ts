import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";


/* это контроллер статических страниц */
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
    // this.ok(res, 'main page');
    this.render(res, 'home');
  }
}