import {Controller, Post, Param, Body, Get} from '@nestjs/common';
import {ContactsService} from './contacts.service';

@Controller('api/contacts')
export class ContactsController{
    constructor(private contactsService: ContactsService){}

    @Get('doctors/:id')
    public async getDoctorContacts(@Param() params){
        return await this.contactsService.getDoctorContacts(params.id);
    }

    @Get(':id')
    public async getContactsByUser(@Param() params){
        return await this.contactsService.getContactsByUser(params.id);
    }

    @Post(':id')
    public async addContacts(@Body() body: any, @Param() params){
        return await this.contactsService.addContacts(body, params.id);
    }

}