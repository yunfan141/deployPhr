import {Module, NestModule, MiddlewaresConsumer, RequestMethod} from '@nestjs/common';
import { DatabaseModule } from '../Database/database.module';
import {TrackersService} from './trackers.service';
import {TrackersController} from './trackers.controller';

@Module({
    imports: [DatabaseModule],
    components: [TrackersService],
    controllers: [TrackersController],
})

export class TrackersModule{}
