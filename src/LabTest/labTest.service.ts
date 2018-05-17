import { Component , Inject} from '@nestjs/common';
import {Repository, getRepository, getConnection} from 'typeorm';
import {LabTestEntity} from './LabTest.entity';
import {UsersEntity} from '../User/users.entity';

@Component()
export class LabTestService {
    constructor(
        @Inject('LabTestRepository') private readonly labTestRepository: Repository<LabTestEntity>,
    ){}

    public async addLabTest(info: any, date: any,  id: number, type1: string, type2: string): Promise<LabTestEntity>{
        const theUser = await getRepository(UsersEntity)
        .createQueryBuilder('user')
        .where('user.id = :name', { name: id })
        .getOne();
        const labTest = new LabTestEntity();
        labTest.user = theUser;
        labTest.type1 = type1;
        labTest.type2 = type2;
        labTest.date = date;
        labTest.info = info;
        return await this.labTestRepository.save(labTest);
    }

    public async getLabTestByUser(id: number, type1: string, type2: string): Promise<any>{
        const selectedLabTest = await getRepository(UsersEntity)
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.labTests', 'labTests')
            .where('users.id = :name', {name: id})
            .andWhere('labTests.type1 = :name1', {name1: type1})
            .andWhere(' labTests.type2 = :name2', {name2: type2})
            .orderBy('labTests.date', 'DESC')
            .getOne();
        const testInfo = [];
        for (const test of selectedLabTest.labTests){
            testInfo.push(test.info);
        }
        return testInfo;
    }
}