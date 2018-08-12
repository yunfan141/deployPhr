import { Component , Inject} from '@nestjs/common';
import {Repository, getRepository, getConnection} from 'typeorm';
import {UsersEntity} from '../User/users.entity';
import {RecordsEntity} from '../Records/Records.entity';

@Component()
export class RecordsService {
    constructor(
        @Inject('RecordsRepository') private readonly recordsRepository: Repository<RecordsEntity>,
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
        const result = [];
        if (userAndRecords === undefined){
            return result;
        }
        const RecordsInfo = userAndRecords.records.map((item) => item.info);
        return RecordsInfo.sort(function compare(a, b) {
            if (a.date < b.date) {
              return -1;
            }
            if (a.date > b.date) {
              return 1;
            }
            return 0;
          });
    }

    public async deleteRecords(id: number, recordid: number, type: string){
        const userAndRecords = await getRepository(UsersEntity)
        .createQueryBuilder('users')
        .leftJoinAndSelect('users.records', 'records')
        .where('users.id = :name', {name: id})
        .andWhere('records.type = :typename', {typename: type})
        .getOne();
        if (userAndRecords === undefined){
            return null;
        }
        const RecordsInfo = userAndRecords.records;
        RecordsInfo.sort(function compare(a, b) {
            if (a.info.date < b.info.date) {
              return -1;
            }
            if (a.info.date > b.info.date) {
              return 1;
            }
            return 0;
          });
        const deleteId = RecordsInfo[recordid];
        console.log(deleteId);
        // return await getRepository(RecordsEntity)
        // .delete(deleteId);
        return await this.recordsRepository.delete(deleteId);
    }
}