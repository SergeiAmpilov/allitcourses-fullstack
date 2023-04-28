import { PrismaClient, UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class PrismaService {
  client: PrismaClient;

  constructor(
    @inject(TYPES.Ilogger) private loggerService: ILogger
  ) {
    this.client = new PrismaClient();
  }
  
  async connect(): Promise<void> {
    try {
      await this.client.$connect();
      this.loggerService.log(`[PrismaService] connected to db`);
    } catch (e: any) {
      if (e instanceof Error) {
        this.loggerService.error(`[PrismaService] error connected to db - ${e.message}`);
      }
    }
  }

  async disconnect(): Promise<void> {
    await this.client.$disconnect();
  }
}