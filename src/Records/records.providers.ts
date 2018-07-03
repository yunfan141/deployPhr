import {Connection} from 'typeorm';
import {RecordsEntity} from './Records.entity';

export const RecordsProvider = {
    provide: 'RecordsRepository',
    useFactory: (connection: Connection) => connection.getRepository(RecordsEntity),
    inject: ['TypeORMInstance'],
};