import {Controller, Post, Param, Body, Get} from '@nestjs/common';
import {LabTestService} from './labTest.service';
import {UsersService} from '../User/users.service';
import { LabTestEntity } from './LabTest.entity';

@Controller('api/records/labTest')
export class LabTestController{
    constructor(private labTestService: LabTestService){}

    @Get('/category')
    public async getCategory(){
        // this.labTestService.addCategory();
        return await this.labTestService.getCategory();
    }

    @Get('/:id')
    public async getLabTestByUser(@Param() params){
        return await this.labTestService.getLabTestByUser(params.id);
    }

    @Get('/:testid/:id')
    public async getLabTegetLabTestByUserAndTypestByUser(@Param() params){
        return await this.labTestService.getLabTestByUserAndType(params.testid, params.id);
    }

    @Post('/:testid/:id')
    public async addLabTest(@Body() body: any, @Param() params){
        // tslint:disable-next-line:max-line-length
        return await this.labTestService.addLabTest(params.testid, params.id, body.subtest, body.result, body.unit, body.abnormal, body.note, body.date);
    }

}