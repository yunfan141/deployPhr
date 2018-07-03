import {Controller, Post, Param, Body, Get, Delete} from '@nestjs/common';
import {RecordsService} from './records.service';

@Controller('api/records')
export class RecordsController{
    constructor(private recordsService: RecordsService){}

    @Get(':type/:id')
    public async getRecords(@Param() params){
        return await this.recordsService.getRecords(params.id, params.type);
    }

    @Post(':type/:id')
    public async addRecords(@Param() params, @Body() body){
        return await this.recordsService.addRecords(params.id, params.type, body);
    }

    @Delete(':type/:recordid/:id')
    public async deleteRecords(@Param() params, @Body() body){
        return await this.recordsService.deleteRecords(params.id, params.recordid, params.type);
    }

}