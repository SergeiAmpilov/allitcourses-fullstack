import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { injectable, inject } from 'inversify';
import { TYPES } from "../types";
import { ILogger } from "../logger/logger.interface";
import "reflect-metadata";
import { AdminGuard } from "../common/admin.guard";
import { IConfigservice } from "../config/config.service.interface";



@injectable()
export class FilterController extends BaseController {
  constructor(
    @inject(TYPES.Ilogger) private loggerService: ILogger,
    @inject(TYPES.ConfigService) private configService: IConfigservice
    ) {
    super(loggerService);
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
        func: this.school,
        middlewares: [
          new AdminGuard(this.configService.get('ADMIN'))
        ]
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