import {Controller, Post, Param, Body, Get} from '@nestjs/common';
import {UsersService} from './users.service';

@Controller('api/users')
export class UsersController{
    constructor(private usersService: UsersService){}

    @Get()
    public async getUsers(){
        return await this.usersService.getUsers();
    }
    @Get('yunfan')
    public async show(){
        return 'Love Yimeng';
    }

    @Get('profile/:id')
    public async getUsersById(@Param() params){
        return await this.usersService.getUsersById(params.id);
    }

    @Post('profile/:id')
    public async updateUserById(@Param() params, @Body() user: any){
        return await this.usersService.updateUserById(params.id, user);
    }

    @Get('test')
    public async gettest(){
        return 'jwt success';
    }

    @Post('signup')
    public async addUsers(@Body() users: any){
        return await this.usersService.addUsers(users);
    }

    @Post('login')
    public async Login(@Body() users: any){
        if (await this.usersService.loginValidate(users)){
            return await this.usersService.getUserId(users);
        }
        else{
            return 'login fail';
        }
    }
}
