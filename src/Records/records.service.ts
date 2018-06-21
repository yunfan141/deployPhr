import { Component , Inject} from '@nestjs/common';
import {Repository, getRepository, getConnection} from 'typeorm';
import {UsersEntity} from '../User/users.entity';
import {RecordsEntity} from '../Records/Records.entity';

@Component()
export class RecordsService {
    constructor(
    ){}

    public async addRecords(id: number, type: string, info: any){
        const theUser = await getRepository(UsersEntity)
        .createQueryBuilder('user')
        .where('user.id = :name', { name: id })
        .getOne();
        const record = new Object();
        record.user = theUser;
        record.info = info;
        record.type = type;
        return await getRepository(RecordsEntity).save(record);
    }

    public async getRecords(id: number, type: string){
        const userAndRecords = await getRepository(UsersEntity)
        .createQueryBuilder('users')
        .leftJoinAndSelect('users.records', 'records')
        .where('users.id = :name', {name: id})
        .andWhere('records.type = :typename', {typename: type})
        .getOne();
        if (userAndRecords === undefined){
            return null;
        }
        const RecordsInfo = userAndRecords.records.map((item) => item.info);
        return RecordsInfo;
    }
}