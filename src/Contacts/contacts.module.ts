import {Module, NestModule, MiddlewaresConsumer, RequestMethod} from '@nestjs/common';
import { DatabaseModule } from '../Database/database.module';
import {ContactsService} from './contacts.service';
import {ContactsController} from './contacts.controller';
import { CorsMiddleware } from '@nest-middlewares/cors';

@Module({
    imports: [DatabaseModule],
    components: [
        ContactsService,
    ],
    controllers: [ContactsController],
})

export class ContactsModule{}