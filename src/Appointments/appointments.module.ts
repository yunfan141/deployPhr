import {Module, NestModule, MiddlewaresConsumer, RequestMethod} from '@nestjs/common';
import { DatabaseModule } from '../Database/database.module';
import {AppointmentsService} from './appointments.service';
import {AppointmentsController} from './appointments.controller';

@Module({
    imports: [DatabaseModule],
    components: [
        AppointmentsService,
    ],
    controllers: [AppointmentsController],
})

export class AppointmentsModule{}
