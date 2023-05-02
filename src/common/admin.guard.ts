import { Request, Response, NextFunction } from "express";
import { IMiddleware } from "./middleware.interface";
import { TYPES } from "../types";
import { IConfigservice } from "../config/config.service.interface";
import { inject } from "inversify";



export class AdminGuard implements IMiddleware {
  constructor(
    private adminLogin: string,
  ) { }

  execute(req: Request, res: Response, next: NextFunction): void {
    if (req.user && req.user ===  this.adminLogin) {
      return next();
    }

    res.status(401).send({
      error: 'you are not admin'
    });
  };
}