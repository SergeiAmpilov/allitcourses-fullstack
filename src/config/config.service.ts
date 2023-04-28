import { inject, injectable } from "inversify";
import { IConfigservice } from "./config.service.interface";
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { TYPES } from "../types";
import { ILogger } from "../logger/logger.interface";

@injectable()
export class ConfigService implements IConfigservice {

  private config: DotenvParseOutput;

  constructor(
    @inject(TYPES.Ilogger) private loggerService: ILogger,
  ) {
    const result: DotenvConfigOutput = config();
    if (result.error) {
      loggerService.error(`cannot read .env file - ${result.error.message}`);
    } else {
      loggerService.log(`[configService] read .env successfully`);
      this.config = result.parsed as DotenvParseOutput;
    }
  }

  get<T extends string | number>(key: string) {
    return this.config[key] as T;
  };
}