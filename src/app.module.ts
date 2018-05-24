import {Module, NestModule, MiddlewaresConsumer, RequestMethod} from '@nestjs/common';
import {UsersModule} from './User/users.module';
import {LabTestModule} from './LabTest/labTest.module';
import {ContactsModule} from 'Contacts/contacts.module';
import { CorsMiddleware } from '@nest-middlewares/cors';

@Module({
  imports: [
    UsersModule,
    LabTestModule,
    ContactsModule,
  ],
})
export class AppModule {
  public configure(consumer: MiddlewaresConsumer) {
    // IMPORTANT! Call Middleware.configure BEFORE using it for routes
    consumer.apply(CorsMiddleware).forRoutes( {path: '*', method: RequestMethod.ALL} );
}
}
