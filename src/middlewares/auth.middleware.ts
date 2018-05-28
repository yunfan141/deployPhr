import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Middleware()
export class AuthMiddleware implements NestMiddleware {
  resolve(...args: any[]): ExpressMiddleware {
    return (req, res, next) => {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'myprecious', {algorithm: 'HS384'},  (err, decoded) => {
          if (err){
            return err;
          }
          req.params.id = decoded.user_id;
          console.log(req.params);
        }); // how to handle error
      }
      else{
        return 'unauthorized';
      }
      next();
    };
  }
}