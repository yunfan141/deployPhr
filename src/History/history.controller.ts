import {Controller, Post, Param, Body, Get} from '@nestjs/common';
import {HistoryService} from './history.service';

@Controller('api/history')
export class HistoryController{
    constructor(private historyService: HistoryService){}

    @Get(':type/:id')
    public async getHistory(@Param() params){
        return await this.historyService.getHistory(params.id, params.type);
    }

    @Post(':type/:id')
    public async addHistory(@Param() params, @Body() body){
        return await this.historyService.addHistory(params.id, params.type, body);
    }
}