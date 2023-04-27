import express, { Express } from 'express';
import { Server }  from 'http';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { FilterController } from './filter/filter.controller';
import { IExeptionFilter } from './errors/exeption.filter.interface';

export class App {

  app: Express;
  port: number;
  server: Server;
  logger: LoggerService;
  userController: UserController;
  filterController: FilterController;
  exeptionFilter: IExeptionFilter;

  constructor(
    logger: LoggerService,
    userController: UserController,
    filterController: FilterController,
    exeptionFilter: IExeptionFilter
  ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.userController = userController;
    this.filterController = filterController;
    this.exeptionFilter = exeptionFilter;
  }

  useRoutes() {
    this.app.use('/user', this.userController.router);
    this.app.use('/', this.filterController.router);
  }

  useExeptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  public async init() {
    this.useRoutes();
    this.useExeptionFilters();
    this.server = this.app.listen(
      this.port,
      () => {
        this.logger.log(`Server has been successfully started on port ${this.port}`);
      }
    );

  }
}