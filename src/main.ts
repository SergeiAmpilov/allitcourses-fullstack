import { App } from "./app";
import { FilterController } from "./filter/filter.controller";
import { LoggerService } from "./logger/logger.service";
import { UserController } from "./users/users.controller";

async function bootstrap() {

  const logger = new LoggerService();

  const app = new App(
    logger,
    new UserController(logger),
    new FilterController(logger)
  );

  await app.init();
}

bootstrap();