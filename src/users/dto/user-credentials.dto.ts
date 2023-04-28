import { IsEmail, IsString } from "class-validator";


export class UserCredentialsDto {
  
  @IsEmail({}, { message: 'incorrect email' })
  email: string;

  @IsString({ message: 'not set password'})
  password: string;
}