import {Module, NestModule, MiddlewaresConsumer, RequestMethod} from '@nestjs/common';
import { DatabaseModule } from '../Database/database.module';
import {ContactsService} from './contacts.service';
import {ContactsController} from './Contacts.controller';

@Module({
    imports: [DatabaseModule],
    components: [
        ContactsService,
    ],
    controllers: [ContactsController],
})

export class ContactsModule{}