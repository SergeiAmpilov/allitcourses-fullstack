import { PrismaService } from "../database/prisma.service";
import { DirectionModel, TechModel, SchoolModel } from "@prisma/client";
import { TYPES } from "../types";
import { IFilterRepository } from "./filter.repository.interface";
import { injectable, inject } from 'inversify';
import { FilterCredentialsDto } from "./filter-credentials.dto";



@injectable()
export class FilterRepository implements IFilterRepository {
  constructor(
    @inject(TYPES.PrismaService) private prismaService: PrismaService,
  ) { }

  async createDirection({ name, slug }: FilterCredentialsDto): Promise<DirectionModel> {
    return this.prismaService.client.directionModel.create({
      data: {
        name, 
        slug
      }
    })
  }

}