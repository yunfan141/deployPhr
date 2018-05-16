import {Connection} from 'typeorm';
import { TrackersEntity } from './Trackers.entity';
import { Inject } from '@nestjs/common';

export const TrackersProviders = {
    provide: 'TrackersRepository',
    useFactory: (connection: Connection) => connection.getRepository(TrackersEntity),
    Inject: ['TypeORMInstance'],
};