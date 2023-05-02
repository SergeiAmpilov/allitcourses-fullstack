import { inject, injectable } from "inversify";
import { FilterCredentialsDto } from "./filter-credentials.dto";
import { DirectionModel, TechModel } from "@prisma/client";
import { TYPES } from "../types";
import { IFilterRepository } from "./filter.repository.interface";


@injectable()
export class FilterService {

  constructor(
    @inject(TYPES.FilterRepository) private filterRepository: IFilterRepository,
  ) {}


  async createDirection({ name, slug }: FilterCredentialsDto): Promise<DirectionModel | null> {

    const foundDirection = await this.filterRepository.findDirection(slug);

    if (foundDirection) {
      return null ;
    }

    return await this.filterRepository.createDirection({ name, slug });
  }

  async createTech({ name, slug }: FilterCredentialsDto): Promise<TechModel | null> {

    const foundTech = await this.filterRepository.findTech(slug);

    if (foundTech) {
      return null ;
    }

    return await this.filterRepository.createTech({ name, slug });
  }

}