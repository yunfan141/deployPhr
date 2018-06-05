import {Module, NestModule, MiddlewaresConsumer, RequestMethod} from '@nestjs/common';
import { DatabaseModule } from '../Database/database.module';
import {HistoryService} from './history.service';
import {HistoryController} from './history.controller';

@Module({
    imports: [DatabaseModule],
    components: [
        HistoryService,
    ],
    controllers: [HistoryController],
})

export class HistoryModule{}
