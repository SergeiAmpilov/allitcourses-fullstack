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

  async findDirection(slug: string): Promise<DirectionModel | null> {
    return this.prismaService.client.directionModel.findFirst({
      where: {
        slug
      }
    })
  }

  async createTech({ name, slug }: FilterCredentialsDto): Promise<TechModel> {
    return this.prismaService.client.techModel.create({
      data: {
        name, 
        slug
      }
    })
  }

  async findTech(slug: string): Promise<TechModel | null> {
    return this.prismaService.client.techModel.findFirst({
      where: {
        slug
      }
    })
  }

  async createSchool({ name, slug }: FilterCredentialsDto): Promise<SchoolModel> {
    return this.prismaService.client.schoolModel.create({
      data: {
        name, 
        slug
      }
    })
  }

  async findSchool(slug: string): Promise<SchoolModel | null> {
    return this.prismaService.client.schoolModel.findFirst({
      where: {
        slug
      }
    })
  }

}