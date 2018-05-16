import {Connection} from 'typeorm';
import {LabTestEntity} from './LabTest.entity';

export const LabTestProvider = {
    provide: 'LabTestRepository',
    useFactory: (connection: Connection) => connection.getRepository(LabTestEntity),
    inject: ['TypeORMInstance'],
};