import {Controller, Post, Param, Body, Get} from '@nestjs/common';
import {DiagnosticsService} from './diagnostic.service';

@Controller('api/records/diagnosticprocedure')
export class DiagnosticController{
    constructor(private diagnosticsService: DiagnosticsService){}

    @Get(':typeid/:id')
    public async getRecords(@Param() params){
        return await this.diagnosticsService.getDiagnostics(params.id, params.typeid);
    }

    @Post(':typeid/:id')
    public async addRecords(@Param() params, @Body() body){
        return await this.diagnosticsService.addDiagnostics(params.id, params.typeid, body);
    }

}