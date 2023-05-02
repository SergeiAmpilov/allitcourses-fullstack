import { DirectionModel, SchoolModel, TechModel } from "@prisma/client";
import { FilterCredentialsDto } from "./filter-credentials.dto";


export interface IFilterRepository {
  createDirection: (dto: FilterCredentialsDto) => Promise<DirectionModel> ;
  findDirection: (slug: string) => Promise<DirectionModel | null>;
  
  createTech: (dto: FilterCredentialsDto) => Promise<TechModel>;
  findTech: (slug: string) => Promise<TechModel | null>;

  createSchool: (dto: FilterCredentialsDto) => Promise<SchoolModel>;
  findSchool: (slug: string) => Promise<SchoolModel | null>;
  
}