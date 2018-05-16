import { Module } from '@nestjs/common';
import {UsersModule} from './User/users.module';
import {LabTestModule} from './LabTest/labTest.module';
import {ContactsModule} from 'Contacts/contacts.module';

@Module({
  imports: [
    UsersModule,
    LabTestModule,
    ContactsModule,
  ],
})
export class AppModule {}
