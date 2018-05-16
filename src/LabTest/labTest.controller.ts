import {Controller, Post, Param, Body, Get} from '@nestjs/common';
import {LabTestService} from './labTest.service';
import {UsersService} from '../User/users.service';
import { LabTestEntity } from './LabTest.entity';

@Controller('LabTest')
export class LabTestController{
    constructor(private labTestService: LabTestService){}

    @Get('/:type1/:type2/:id')
    public async getLabTestByUser(@Param() params){
        return await this.labTestService.getLabTestByUser(params.id, params.type1, params.type2);
    }

    @Post('/:type1/:type2/:id')
    public async addLabTest(@Body() body: any, @Param() params){
        return await this.labTestService.addLabTest(body.info, body.date, params.id, params.type1, params.type2);
    }

}