import {Module, NestModule, MiddlewaresConsumer, RequestMethod} from '@nestjs/common';
import { DatabaseModule } from '../Database/database.module';
import {LabTestProvider} from './labTest.providers';
import {LabTestService} from './labTest.service';
import {LabTestController} from './labTest.controller';

@Module({
    imports: [DatabaseModule],
    components: [
        LabTestProvider,
        LabTestService,
    ],
    controllers: [LabTestController],
})

export class LabTestModule{}