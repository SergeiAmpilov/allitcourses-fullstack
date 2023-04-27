import express, { Express } from 'express';
import { Server }  from 'http';
import { UserController } from './users/users.controller';
import { FilterController } from './filter/filter.controller';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { PagesController } from './pages/pages.controller';
import path from 'path';
import { ILogger } from './logger/logger.interface';
import { engine } from 'express-handlebars';
import { injectable, inject } from 'inversify';
import { TYPES } from './types';
import "reflect-metadata";



@injectable()
export class App {

  app: Express;
  port: number;
  server: Server;

  constructor(
    @inject(TYPES.Ilogger) private logger: ILogger,
    @inject(TYPES.UserController) private userController: UserController,
    @inject(TYPES.FilterController) private filterController: FilterController,
    @inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
    @inject(TYPES.PagesController) private pagesController: PagesController  ) {

    this.app = express();
    this.port = 8000;
    // this.logger = logger;
    // this.userController = userController;
    // this.filterController = filterController;
    // this.exeptionFilter = exeptionFilter;
    // this.pagesController = pagesController;
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
    this.app.engine('hbs', engine({
      defaultLayout: 'main',
      extname: 'hbs'
    }));
    this.app.set('view engine', 'hbs');
    this.app.set('views', 'views');
  
    this.logger.log(`[handlebars] Use template controller`);

  }

  useStaticFiles() {
    const staticDirName = path.join(path.dirname(__dirname), '/public');
    this.app.use(express.static(staticDirName));
    this.logger.log(`[static] ${staticDirName}`);
  }

  public async init() {
    this.useStaticFiles();
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