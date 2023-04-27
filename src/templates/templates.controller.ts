import { LoggerService } from "../logger/logger.service";
import { Express } from 'express';
import { engine } from 'express-handlebars';


export class TemplatesController {

  logger: LoggerService;
  app: Express;

  constructor(logger: LoggerService, app: Express) {
    this.app = app;
    this.logger = logger;    

    this.app.engine('hbs', engine({
      defaultLayout: 'main',
      extname: 'hbs'
    }));
    this.app.set('view engine', 'hbs');
    this.app.set('views', 'views');
  
    this.logger.log(`[handlebars] Use template controller`);
  }
  
}