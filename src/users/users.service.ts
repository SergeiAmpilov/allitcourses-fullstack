import { inject, injectable } from "inversify";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";
import { User } from "./user.entity";
import { IUserService } from "./users.service.interface";
import { TYPES } from "../types";
import { IConfigservice } from "../config/config.service.interface";

@injectable()
export class UserService implements IUserService {

  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigservice,
  ) {

  }

  async createUser(dto: UserRegisterDto): Promise<User | null> {
    const { name, email, password} = dto;
    const newUser = new User(email, name);
    await newUser.setPassword(password);
    return newUser ;
  };

  async validateUser(dto: UserLoginDto): Promise<boolean> {
    const { email, password } = dto;
    return true ;
  };
}