import {Module, NestModule, MiddlewaresConsumer, RequestMethod} from '@nestjs/common';
import { DatabaseModule } from '../Database/database.module';
import { JwtStrategy } from './jwt.strategy';
import { UsersProvider } from './users.providers';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import * as passport from 'passport';

@Module({
    imports: [DatabaseModule],
    components: [
        UsersProvider,
        UsersService,
        JwtStrategy,
    ],
    controllers: [UsersController],
})

export class UsersModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
      consumer
        .apply(passport.authenticate('jwt', { session: false }))
        .forRoutes({ path: '/Users/test', method: RequestMethod.ALL });
    }
  }