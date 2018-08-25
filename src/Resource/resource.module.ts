import {Module} from '@nestjs/common';
import { DatabaseModule } from '../Database/database.module';
import {ResourceService} from './resource.service';
import {ResourceController} from './resource.controller';

@Module({
    imports: [DatabaseModule],
    components: [
        ResourceService,
    ],
    controllers: [ResourceController],
})

export class ResourceModule{}