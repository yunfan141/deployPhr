import {Connection} from 'typeorm';
import {ResourceEntity} from './resource.entity';

export const ResourceProvider = {
    provide: 'ResourceRepository',
    useFactory: (connection: Connection) => connection.getRepository(ResourceEntity),
    inject: ['TypeORMInstance'],
};