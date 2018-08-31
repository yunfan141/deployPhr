import {Controller, Post, Param, Body, Get, Delete} from '@nestjs/common';
import {ResourceService} from './resource.service';

@Controller('api/Resource')
export class ResourceController{
    constructor(private resourceService: ResourceService){}

    @Get(':id')
    public async getResource(@Param() params){
        return await this.resourceService.getResource(params.id);
    }

    @Post(':id')
    public async addResource(@Param() params, @Body() body){
        return await this.resourceService.addResource(params.id, body);
    }

    @Delete(':resourceid/:id')
    public async deleteResource(@Param() params){
        return await this.resourceService.deleteResource(params.id, params.resourceid);
    }

}