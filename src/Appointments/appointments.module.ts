import {Module, NestModule, MiddlewaresConsumer, RequestMethod} from '@nestjs/common';
import { DatabaseModule } from '../Database/database.module';
import {AppointmentsService} from './appointments.service.ts';
import {AppointmentsController} from './appointments.controller.ts';

@Module({
    imports: [DatabaseModule],
    components: [
        AppointmentsService,
    ],
    controllers: [AppointmentsController],
})

export class AppointmentsModule{}
