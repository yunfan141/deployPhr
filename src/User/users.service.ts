import { Component , Inject} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import {Repository, getRepository, getConnection} from 'typeorm';
import {UsersEntity} from './users.entity';
import * as bcrypt from 'bcryptjs';
@Component()
export class UsersService {
    constructor(
        @Inject('UsersRepository') private readonly usersRepository: Repository<UsersEntity>,
    ){
        // const bcrypt = require('bcryptjs');
    }

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
            const salt = bcrypt.genSaltSync(10);
            users.password = bcrypt.hashSync(users.password, salt);
            await this.usersRepository.save(users);
            const newuser = await this.usersRepository.findOne({where: {username: users.username}});
            rsp.id = newuser.id;
            rsp.exist = false;
        }
        return rsp;
    }

    public async editPassword(id: number, pass: any){
        const user = await this.usersRepository.findOne({where: {id: id}});
        if (pass.currentPassword !== user.password){
            return -1;
        }
        else{
            await getRepository(UsersEntity)
            .createQueryBuilder('user')
            .update()
            .set({password: pass.newPassword,
            })
            .where('id = :name', {name: id})
            .execute();
            return 1;

        }
    }

    public async matchEmail(email: string){
        const user = await this.usersRepository.findOne({where: {email: email}});
        if (user){
            return {id: user.id, securityQuestion: user.securityQuestion};
        }
        else{
            return -1;
        }
    }

    public async checkSecurityanswer(id: number, answer: any){
        const user = await this.usersRepository.findOne({where: {id: id}});
        if (user.securityAnswer == answer ){
            return 1;
        }
        else{
            return -1;
        }

    }

    public async resetPassword(id: number, password: string){
        await getRepository(UsersEntity)
            .createQueryBuilder('user')
            .update()
            .set({password: password})
            .where('id = :name', {name: id})
            .execute();
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
        const theUser = await this.usersRepository.findOne({where: {username : users.username}});
        const hash = theUser.password;
        console.log(hash);
        if (bcrypt.compareSync(users.password, hash) || users.password === hash){
            return true;
        }
        else{
            return false;
        }
    }
}