import { DirectionModel } from "@prisma/client";
import { FilterCredentialsDto } from "./filter-credentials.dto";


export interface IFilterRepository {
  createDirection: (dto: FilterCredentialsDto) => Promise<DirectionModel> ;
  findDirection: (slug: string) => Promise<DirectionModel | null>;
  
}