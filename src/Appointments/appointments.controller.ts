import {Controller, Post, Param, Body, Get, Delete} from '@nestjs/common';
import {AppointmentsService} from './appointments.service';

@Controller('api/appointment')
export class AppointmentsController{
    constructor(private appointmentsService: AppointmentsService){}

    @Get(':id')
    public async getAppointments(@Param() params){
        return await this.appointmentsService.getAppointments(params.id);
    }

    @Get(':days/:id')
    public async getReminderAppointments(@Param() params){
        return await this.appointmentsService.getReminderAppointments(params.days,params.id);
    }

    @Post(':id')
    public async addAppointments(@Param() params, @Body() body: any){
        return await this.appointmentsService.addAppointments(params.id, body);
    }

    @Post(':id/:recordid')
    public async updateAppointment(@Param() params, @Body() body: any){
        return await this.appointmentsService.updateAppointment(params.id, params.recordid, body);
    }

    @Delete(':recordid/:id')
    public async deleteAppointments(@Param() params){
        return await this.appointmentsService.deleteAppointments(params.id, params.recordid);
    }
}