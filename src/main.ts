import "reflect-metadata";
import { Container } from "inversify";
import { App } from "./app";
import { ExeptionFilter } from "./errors/exeption.filter";
import { FilterController } from "./filter/filter.controller";
import { LoggerService } from "./logger/logger.service";
import { PagesController } from "./pages/pages.controller";
import { UserController } from "./users/users.controller";
import { ILogger } from "./logger/logger.interface";
import { TYPES } from "./types";
import { IExeptionFilter } from "./errors/exeption.filter.interface";

const appContainer = new Container();
appContainer.bind<ILogger>(TYPES.Ilogger).to(LoggerService);
appContainer.bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
appContainer.bind<UserController>(TYPES.UserController).to(UserController);
appContainer.bind<FilterController>(TYPES.FilterController).to(FilterController);
appContainer.bind<PagesController>(TYPES.PagesController).to(PagesController);
appContainer.bind<App>(TYPES.Application).to(App);

const app = appContainer.get<App>(TYPES.Application);
app.init();

export { app, appContainer };