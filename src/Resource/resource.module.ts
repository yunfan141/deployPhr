import {Module} from '@nestjs/common';
import { DatabaseModule } from '../Database/database.module';
import {ResourceService} from './resource.service';
import {ResourceController} from './resource.controller';
import {ResourceProvider} from './resource.providers';

@Module({
    imports: [DatabaseModule],
    components: [
        ResourceService,
        ResourceProvider,
    ],
    controllers: [ResourceController],
})

export class ResourceModule{}