import { inject, injectable } from "inversify";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";
import { User } from "./user.entity";
import { IUserService } from "./users.service.interface";
import { TYPES } from "../types";
import { IConfigservice } from "../config/config.service.interface";
import { IUsersRepository } from "./users.repository.interface";
import { UserModel } from "@prisma/client";

@injectable()
export class UserService implements IUserService {

  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigservice,
    @inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
  ) {

  }

  async createUser(dto: UserRegisterDto): Promise<UserModel | null> {
    const { name, email, password} = dto;
    const newUser = new User(email, name);
    const salt = this.configService.get('SALT');
    await newUser.setPassword(password, Number(salt));

    const existedUser = await this.usersRepository.find(email);
    if (existedUser) {
      return null;
    } else {
      return this.usersRepository.create(newUser);
    }
  };

  async validateUser(dto: UserLoginDto): Promise<number | null> {
    const { email, password } = dto;
    const existedUser = await this.usersRepository.find(email);
    
    
    if (!existedUser) {
      return null;
    }
    
    const newUser = new User(existedUser.email, existedUser.name);
    const result = await newUser.checkPassword(password, existedUser.password);

    if (result) {
      return existedUser.id
    }

    return null;
  };
}