import {Controller, Post, Param, Body, Get, Delete} from '@nestjs/common';
import {DiagnosticsService} from './diagnostic.service';

@Controller('api/records/diagnosticprocedure')
export class DiagnosticController{
    constructor(private diagnosticsService: DiagnosticsService){}

    @Get('days/:days/:id')
    public async getRencentRecords(@Param() params){
        return await this.diagnosticsService.getRecentDiagnostics(params.id, params.days);
    }

    @Get(':typeid/:id')
    public async getRecords(@Param() params){
        return await this.diagnosticsService.getDiagnostics(params.id, params.typeid);
    }

    @Post(':typeid/:id')
    public async addRecords(@Param() params, @Body() body){
        return await this.diagnosticsService.addDiagnostics(params.id, params.typeid, body);
    }

    @Delete(':typeid/:subtypeid/:resultid/:id')
    public async deleteDiagnostic(@Param() params){
        return await this.diagnosticsService.deleteDiagnostic(params.id, params.typeid, params.subtypeid, params.resultid);
    }

}