import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { injectable, inject } from 'inversify';
import { TYPES } from "../types";
import { ILogger } from "../logger/logger.interface";
import "reflect-metadata";
import { AdminGuard } from "../common/admin.guard";
import { IConfigservice } from "../config/config.service.interface";
import { FilterCredentialsDto } from "./filter-credentials.dto";
import { IFilterRepository } from "./filter.repository.interface";
import { HTTPError } from "../errors/http-error.class";
import { FilterService } from "./filter.service";



@injectable()
export class FilterController extends BaseController {
  constructor(
    @inject(TYPES.Ilogger) private loggerService: ILogger,
    @inject(TYPES.ConfigService) private configService: IConfigservice,
    @inject(TYPES.FilterService) private filterService: FilterService
    ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: '/direction/:slug',
        method: 'get',
        func: this.direction
      },
      {
        path: '/direction',
        method: 'post',
        func: this.newDirection
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

  async newDirection(req: Request<{}, {}, FilterCredentialsDto>, res: Response, next: NextFunction): Promise<void> {
    const result = await this.filterService.createDirection(req.body);

    if (result) {
      this.ok(res, { result });
    } else {
      return next(new HTTPError(422, 'this direction allready exists'));      
    }

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