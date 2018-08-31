import {Controller, Post, Param, Body, Get, Delete} from '@nestjs/common';
import {HistoryService} from './history.service';

@Controller('api/history')
export class HistoryController{
    constructor(private historyService: HistoryService){}

    @Get('days/:days/:id')
    public async getRecenthistory(@Param() params){
        return await this.historyService.getReminderHistory(params.id, params.days);
    }
    @Get(':type/:id')
    public async getHistory(@Param() params){
        if (params.type === 'social'){
            return await this.historyService.getSocialHistory(params.id);
        }
        return await this.historyService.getHistory(params.id, params.type);
    }

    @Post(':type/:id')
    public async addHistory(@Param() params, @Body() body){
        return await this.historyService.addHistory(params.id, params.type, body);
    }

    @Post('social/:type/:id')
    public async addSocialHistory(@Param() params, @Body() body){
        return await this.historyService.addSocialHistory(params.id, params.type, body);
    }

    @Delete(':type/:recordid/:id')
    public async deleteHistory(@Param() params){
        return await this.historyService.deleteHistory(params.id, params.recordid, params.type);
    }

    @Delete(':type/:subtype/:recordid/:id')
    public async deleteSocialHistory(@Param() params){
        return await this.historyService.deleteSocialHistory(params.id, params.recordid, params.subtype);
    }

}