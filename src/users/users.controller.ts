import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { HTTPError } from "../errors/http-error.class";
import { injectable, inject } from 'inversify';
import { TYPES } from "../types";
import { ILogger } from "../logger/logger.interface";
import "reflect-metadata";
import { IUserController } from "./users.interface";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";
import { User } from "./user.entity";


@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(@inject(TYPES.Ilogger) private loggerService: ILogger) {
    super(loggerService);
    this.bindRoutes([
      {
        path: '/register',
        method: 'post',
        func: this.register
      },
      {
        path: '/login',
        method: 'post',
        func: this.login
      }
    ]);
  }

  login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction) {
    next(new HTTPError(401, 'incorrect login', 'user.login'));
  }

  async register(
    { body }: Request<{}, {}, UserRegisterDto>, 
    res: Response, 
    next: NextFunction
    ): Promise<void> {
      const newUser = new User(body.email, body.name);
      await newUser.setPassword(body.password);
      this.ok(res, newUser);
  }
}