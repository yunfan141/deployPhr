import {Module, NestModule, MiddlewaresConsumer, RequestMethod} from '@nestjs/common';
import { DatabaseModule } from '../Database/database.module';
import { UsersProvider } from './users.providers';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {AuthMiddleware} from './../middlewares/auth.middleware';
import * as passport from 'passport';

@Module({
    imports: [DatabaseModule],
    components: [
        UsersProvider,
        UsersService,
    ],
    controllers: [UsersController],
})

export class UsersModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
      consumer
        .apply(AuthMiddleware)
        .forRoutes({ path: 'api/Users/test', method: RequestMethod.ALL });
    }
  }