import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";

export class FilterController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);
    this.bindRoutes([
      {
        path: '/direction/:slug',
        method: 'get',
        func: this.direction
      },
      
      {
        path: '/tech/:slug',
        method: 'get',
        func: this.tech
      },
      {
        path: '/school/:slug',
        method: 'get',
        func: this.school
      },
    ]);
  }

  direction(req: Request, res: Response, next: NextFunction) {
    const { slug } = req.params;
    this.ok(res, `filter direction ${slug}`);
  }

  tech(req: Request, res: Response, next: NextFunction) {
    const { slug } = req.params;
    this.ok(res, `filter tech ${slug}`);
  }

  school(req: Request, res: Response, next: NextFunction) {
    const { slug } = req.params;
    this.ok(res, `filter school ${slug}`);
  }

}