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
import { IUserService } from "./users.service.interface";
import { ValidateMiddeleware } from "../common/validate.middleware";
import { sign } from 'jsonwebtoken';


@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(
    @inject(TYPES.Ilogger) private loggerService: ILogger,
    @inject(TYPES.UserService) private userService: IUserService
    ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: '/register',
        method: 'post',
        func: this.register,
        middlewares: [
          new ValidateMiddeleware(UserRegisterDto)
        ]
      },
      {
        path: '/login',
        method: 'post',
        func: this.login,
        middlewares: [
          new ValidateMiddeleware(UserLoginDto)
        ]
      }
    ]);
  }

  async login(
    { body }: Request<{}, {}, UserLoginDto>, 
    res: Response, 
    next: NextFunction): Promise<void> {
    const result = await this.userService.validateUser(body);
    if (result) {
      this.ok(res, {
        id: result
      });
    } else {
      next(new HTTPError(401, 'incorrect login', 'user.login'));
    }
  }

  async register(
    { body }: Request<{}, {}, UserRegisterDto>, 
    res: Response, 
    next: NextFunction
    ): Promise<void> {

      const result = await this.userService.createUser(body);

      if (!result) {
        return next(new HTTPError(422, 'this user allready exists'));
      }

      this.ok(res, {
        email: result.email,
        id: result.id
      });
  }

  private signJWT(email: string, secret: string): Promise<string> {

    return new Promise<string>((resolve, reject) => {
      sign({
        email,
        iat: Math.floor(Date.now() / 1000 ),
      }, secret, {
        algorithm: 'HS256'
      },
      (err, token) => {
        if (err) {
          reject(err)
        }
        resolve(token as string);
      }
      );
    })

  }
}