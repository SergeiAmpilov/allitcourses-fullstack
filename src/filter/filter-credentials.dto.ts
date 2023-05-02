import { IsString } from "class-validator";


export class FilterCredentialsDto {
  
  @IsString({ message: 'incorrect name' })
  name: string;

  @IsString({ message: 'not set slug'})
  slug: string;
}