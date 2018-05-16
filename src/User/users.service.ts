import { Component , Inject} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import {Repository, getRepository, getConnection} from 'typeorm';
import {UsersEntity} from './users.entity';

@Component()
export class UsersService {
    constructor(
        @Inject('UsersRepository') private readonly usersRepository: Repository<UsersEntity>,
    ){}

    public async createToken(user) {
        const secretOrKey = 'secret', expiresIn = 60 * 60;
        const user_name = { username : user.username }
           const token = jwt.sign(user_name, secretOrKey, {expiresIn});
    
        return {
            expires_in: expiresIn,
            access_token: token,
        };
    }

    public async getUsers(): Promise<Array<UsersEntity>>{
        return await this.usersRepository.find();
    }

    public async getUsersById(id: number): Promise<UsersEntity>{
        return await this.usersRepository.findOne({where: {id : id}});
    }

    public async addUsers(users: any): Promise<UsersEntity>{
        return await this.usersRepository.save(users);
    }

    public async loginValidate(users: any): Promise<boolean>{
        if (await this.usersRepository.findOne({where: {username : users.username, password : users.password}})){
            return true;
        }
        else{
            return false;
        }
    }

}