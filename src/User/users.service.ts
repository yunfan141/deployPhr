import { Component , Inject} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import {Repository, getRepository, getConnection} from 'typeorm';
import {UsersEntity} from './users.entity';

@Component()
export class UsersService {
    constructor(
        @Inject('UsersRepository') private readonly usersRepository: Repository<UsersEntity>,
    ){}

    // public async createToken(user) {
    //     const secretOrKey = 'secret', expiresIn = 60 * 60*24*30;
    //     const user_name = { username : user.username }
    //        const token = jwt.sign(user_name, secretOrKey, {expiresIn});

    //     return {
    //         expires_in: expiresIn,
    //         access_token: token,
    //     };
    // }

    public async createToken(user: any){
        // const theUser = this.usersRepository.findOne({where: {username : user.username, password : user.password}}) id undefined error
        const theUser = await getRepository(UsersEntity)
        .createQueryBuilder('user')
        .where('user.username = :username', { username: user.username })
        .andWhere('user.password = :password', { password: user.password })
        .getOne();
        console.log(theUser);
        return await jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30),
            user_id : theUser.id,
        }, 'myprecious', {algorithm: 'HS384'});
    }

    public async getUserId(user: any){
        // const theUser = this.usersRepository.findOne({where: {username : user.username, password : user.password}}) id undefined error
        const theUser = await getRepository(UsersEntity)
        .createQueryBuilder('user')
        .where('user.username = :username', { username: user.username })
        .andWhere('user.password = :password', { password: user.password })
        .getOne();
        return theUser.id;
    }

    public async getUsersById(id: number): Promise<UsersEntity>{
        return await this.usersRepository.findOne({where: {id: id}});
    }

    public async updateUserById(id: number, user: any): Promise<UsersEntity>{
        return await getRepository(UsersEntity)
        .createQueryBuilder('user')
        .update()
        .set({email: user.email,
        firstname: user.firstname, lastname: user.lastname, tel: user.tel, address: user.address,
        gender: user.gender, birthday: user.birthday, race: user.race})
        .where('id = :name', {name: id})
        .execute();
    }

    public async addUsers(users: any): Promise<any>{
        const user = await this.usersRepository.findOne({where: {username: users.username}});
        const rsp = {};
        if (user){
            rsp.id = -1;
            rsp.exist = true;
        }
        else{
            rsp.id = users.id;
            rsp.exist = false;
            this.usersRepository.save(users);
        }
        return rsp;
    }

    // public async updateUserById(users: any,id: number): Promise<UsersEntity>{
    //     const user = await getRepository(UsersEntity)
    //     .createQueryBuilder()
    //     .update()
    //     .set({})
    // }

    // public async updateUserById(users: any,id: number): Promise<UsersEntity>{
    //     return await this.usersRepository.updateById(id, users);
    // }

    public async loginValidate(users: any): Promise<boolean>{
        if (await this.usersRepository.findOne({where: {username : users.username, password : users.password}})){
            return true;
        }
        else{
            return false;
        }
    }

}