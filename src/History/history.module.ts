import {Module, NestModule, MiddlewaresConsumer, RequestMethod} from '@nestjs/common';
import { DatabaseModule } from '../Database/database.module';
import {HistoryService} from './History.service';
import {HistoryController} from './History.controller';

@Module({
    imports: [DatabaseModule],
    components: [
        HistoryService,
    ],
    controllers: [HistoryController],
})

export class HistoryModule{}
