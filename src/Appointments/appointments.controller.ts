import {Controller, Post, Param, Body, Get} from '@nestjs/common';
import {AppointmentsService} from './appointments.service.ts';

@Controller('api/appointment')
export class AppointmentsController{
    constructor(private appointmentsService: AppointmentsService){}

    @Get(':id')
    public async getAppointments(@Param() params){
        return await this.appointmentsService.getAppointments(params.id);
    }

    @Post(':id')
    public async addAppointments(@Param() params, @Body() body: any){
        return await this.appointmentsService.addAppointments(params.id, body);
    }
}