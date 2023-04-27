import express, { Express } from 'express';
import { Server }  from 'http';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { FilterController } from './filter/filter.controller';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { PagesController } from './pages/pages.controller';
import { engine } from 'express-handlebars';

export class App {

  app: Express;
  port: number;
  server: Server;
  logger: LoggerService;
  userController: UserController;
  filterController: FilterController;
  exeptionFilter: IExeptionFilter;
  pagesController: PagesController;

  constructor(
    logger: LoggerService,
    userController: UserController,
    filterController: FilterController,
    exeptionFilter: IExeptionFilter,
    pagesController: PagesController
  ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.userController = userController;
    this.filterController = filterController;
    this.exeptionFilter = exeptionFilter;
    this.pagesController = pagesController;
  }

  useRoutes() {
    this.app.use('/user', this.userController.router);
    this.app.use('/', this.filterController.router);
    this.app.use('/', this.pagesController.router);

  }

  useExeptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  useTemplateController() {
    this.app.engine('handlebars', engine());
    this.app.set('view engine', 'handlebars');
    this.app.set('views', './views');
    this.logger.log(`[handlebars] Use template controller`);
  }

  public async init() {
    this.useTemplateController();
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