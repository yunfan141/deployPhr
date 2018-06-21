import {Module, NestModule, MiddlewaresConsumer, RequestMethod} from '@nestjs/common';
import { DatabaseModule } from '../Database/database.module';
import {RecordsService} from './records.service';
import {RecordsController} from './records.controller';

@Module({
    imports: [DatabaseModule],
    components: [
        RecordsService,
    ],
    controllers: [RecordsController],
})

export class RecordsModule{}
