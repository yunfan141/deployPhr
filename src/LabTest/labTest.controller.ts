import {Controller, Post, Param, Body, Get} from '@nestjs/common';
import {LabTestService} from './labTest.service';
import {UsersService} from '../User/users.service';
import { LabTestEntity } from './LabTest.entity';

@Controller('LabTest')
export class LabTestController{
    constructor(private labTestService: LabTestService){}

    @Get('/category')
    public async getCategory(){
        await this.labTestService.addCategory();
        return await this.labTestService.getCategory();
    }

    @Get('/:id')
    public async getLabTestByUser(@Param() params){
        return await this.labTestService.getLabTestByUser(params.id);
    }

    @Post('/:testid/:id')
    public async addLabTest(@Body() body: any, @Param() params){
        return await this.labTestService.addLabTest(params.testid, params.id, body.subtest, body.result, body.abnormal, body.note, body.date);
    }

}