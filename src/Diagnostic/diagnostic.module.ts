import {Module, NestModule, MiddlewaresConsumer, RequestMethod} from '@nestjs/common';
import { DatabaseModule } from '../Database/database.module';
import {DiagnosticsService} from './diagnostic.service';
import {DiagnosticController} from './diagnostic.controller';

@Module({
    imports: [DatabaseModule],
    components: [
        DiagnosticsService,
    ],
    controllers: [DiagnosticController],
})

export class DiagnosticsModule{}
