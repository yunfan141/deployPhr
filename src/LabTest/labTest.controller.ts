import {Controller, Post, Param, Body, Get, Delete} from '@nestjs/common';
import {LabTestService} from './labTest.service';
import {UsersService} from '../User/users.service';
import { LabTestEntity } from './LabTest.entity';

@Controller('api/records/labTest')
export class LabTestController{
    constructor(private labTestService: LabTestService){}

    @Get('/category')
    public async getCategory(){
        return await this.labTestService.getCategory();
    }

    @Get('/addCategory')
    public async addCategory(){
        return await this.labTestService.addCategory();
    }

    @Get('days/:days/:id')
    public async getRecentlabTests(@Param() params){
        return await this.labTestService.getRecentlabTests(params.id, params.days);
    }

    @Get('/:testid/:id')
    public async getLabTegetLabTestByUserAndTypestByUser(@Param() params){
        return await this.labTestService.getLabTestByUserAndType(params.testid, params.id);
    }

    @Post('/:testid/:id')
    public async addLabTest(@Body() body: any, @Param() params){
        // tslint:disable-next-line:max-line-length
            return await this.labTestService.addLabTest(params.testid, params.id, body.subtest,
             body.result, body.unit, body.abnormal, body.note, body.date);
    }

    @Delete('/:testid/:subtestid/:resultid/:id')
    public async deleteLabtest(@Param() params){
        return await this.labTestService.deleteLabtest(params.testid, params.subtestid, params.resultid, params.id);
    }

}