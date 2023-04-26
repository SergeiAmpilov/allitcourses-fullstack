import express, { Express } from 'express';
import { Server }  from 'http';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { FilterController } from './filter/filter.controller';

export class App {

  app: Express;
  port: number;
  server: Server;
  logger: LoggerService;
  userController: UserController;
  filterController: FilterController;


  constructor(
    logger: LoggerService,
    userController: UserController,
    filterController: FilterController
  ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.userController = userController;
    this.filterController = filterController;
  }

  useRoutes() {
    this.app.use('/user', this.userController.router);
    this.app.use('/', this.filterController.router);
  }

  public async init() {
    this.useRoutes();
    this.server = this.app.listen(
      this.port,
      () => {
        this.logger.log(`Server has been successfully started on port ${this.port}`);
      }
    );

  }
}