import "reflect-metadata";
import { Container, ContainerModule, interfaces } from "inversify";
import { App } from "./app";
import { ExeptionFilter } from "./errors/exeption.filter";
import { FilterController } from "./filter/filter.controller";
import { LoggerService } from "./logger/logger.service";
import { PagesController } from "./pages/pages.controller";
import { UserController } from "./users/users.controller";
import { ILogger } from "./logger/logger.interface";
import { TYPES } from "./types";
import { IExeptionFilter } from "./errors/exeption.filter.interface";
import { IUserController } from "./users/users.interface";
import { IUserService } from "./users/users.service.interface";
import { UserService } from "./users/users.service";
import { IConfigservice } from "./config/config.service.interface";
import { ConfigService } from "./config/config.service";
import { PrismaService } from "./database/prisma.service";
import { IUsersRepository } from "./users/users.repository.interface";
import { UsersRepository } from "./users/users.repository";

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.Ilogger).to(LoggerService).inSingletonScope();
  bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
  bind<IUserController>(TYPES.UserController).to(UserController);
  bind<IUserService>(TYPES.UserService).to(UserService);
  bind<FilterController>(TYPES.FilterController).to(FilterController);
  bind<PagesController>(TYPES.PagesController).to(PagesController);
  bind<IConfigservice>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
  bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
  bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inRequestScope();
  bind<App>(TYPES.Application).to(App);
});

function bootstrap() {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();

  return {app, appContainer};

}



export const { app, appContainer } = bootstrap();