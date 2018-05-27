import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Middleware()
export class AuthMiddleware implements NestMiddleware {
  resolve(...args: any[]): ExpressMiddleware {
    return (req, res, next) => {
      console.log(req.headers);
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'myprecious', {algorithm: 'HS384'}); // how to handle error
        console.log(decoded);
        req.params.id = decoded.user_id;
      }
      else{
        return 'unauthorized';
      }
      console.log(req.params);
      next();
    };
  }
}