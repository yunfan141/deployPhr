import {Module, NestModule, MiddlewaresConsumer, RequestMethod} from '@nestjs/common';
import {UsersModule} from './User/users.module';
import {LabTestModule} from './LabTest/labTest.module';
import {ContactsModule} from './Contacts/contacts.module';
import {AppointmentsModule} from './Appointments/appointments.module';
import { CorsMiddleware } from '@nest-middlewares/cors';
import {TrackersModule} from './Trackers/trackers.module';
import {HistoryModule} from './History/history.module';
import { RecordsModule } from './Records/records.module';
import {DiagnosticsModule} from './Diagnostic/diagnostic.module';
import {ResourceModule} from './Resource/resource.module';
@Module({
  imports: [
    UsersModule,
    LabTestModule,
    ContactsModule,
    AppointmentsModule,
    TrackersModule,
    HistoryModule,
    RecordsModule,
    DiagnosticsModule,
    ResourceModule,
  ],
})
export class AppModule {
  public configure(consumer: MiddlewaresConsumer) {
    // IMPORTANT! Call Middleware.configure BEFORE using it for routes
    consumer.apply(CorsMiddleware).forRoutes( {path: '*', method: RequestMethod.ALL} );
}
}
