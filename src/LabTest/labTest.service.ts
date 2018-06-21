import { Component , Inject} from '@nestjs/common';
import {Repository, getRepository, getConnection} from 'typeorm';
import {LabTestEntity} from './LabTest.entity';
import {UsersEntity} from '../User/users.entity';
import {LabTestCategoryEntity} from './LabTestCategory.entity';

@Component()
export class LabTestService {
    constructor(
        @Inject('LabTestRepository') private readonly labTestRepository: Repository<LabTestEntity>,
    ){}

    public async addCategory(){
        await getRepository(LabTestCategoryEntity)
        .createQueryBuilder('category')
        .insert()
        .into(LabTestCategoryEntity)
        .values([
            {
                id: 1,
                name: 'ANA',
                unit: '',
                isnumber: false,
                subtest: ['sss', 'sdsdas', 'sds']
            },
            {
                id: 2,
                name: 'BMP (Basic Metabolic Panel)',
                unit: 'mg/dL',
                isnumber: true,
                subtest: ['sss', 'sdsdas', 'sds']
            },
        ])
        .execute();
    }

    public async addLabTest(testid: number, id: number, subtest: string,
                            result: number, abnormal: boolean, note: string, date: Date): Promise<LabTestEntity>{
        const theUser = await getRepository(UsersEntity)
        .createQueryBuilder('user')
        .where('user.id = :name', { name: id })
        .getOne();
        const theTest = await getRepository(LabTestCategoryEntity)
        .createQueryBuilder('test')
        .where('test.id = :name', { name: testid })
        .getOne();
        console.log(theTest);
        const theSubtest = theTest.subtest;
        if (theSubtest.find(item => item === subtest) === undefined){
            console.log(theSubtest);
            console.log('ififififiifififififififififfifiifif');
            console.log(subtest);
            theSubtest.push(subtest);
            await getRepository(LabTestCategoryEntity)
            .createQueryBuilder('update')
            .update(LabTestCategoryEntity)
            .set({ subtest: theSubtest})
            .where('id = :testid', { testid: testid })
            .execute();
        }
        const labTest = new LabTestEntity();
        labTest.user = theUser;
        labTest.date = date;
        labTest.note = note;
        labTest.result = result;
        labTest.abnormal = abnormal;
        labTest.subtest = subtest;
        labTest.test = theTest;
        return await this.labTestRepository.save(labTest);
    }

    public async getLabTestByUser(id: number): Promise<any>{
        const selectedLabTest = await getRepository(UsersEntity)
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.labTests', 'labTests')
            .where('users.id = :name', {name: id})
            .orderBy('labTests.date', 'DESC')
            .getOne();
        const result = [];
        for (const test of selectedLabTest.labTests){
            console.log(test);
            test.id = test.test.id;
            test.name = test.subtest;
            test.unit = test.test.unit;
            test.isnumber = test.test.isnumber;
            delete test.user;
            delete test.test;
            result.push(test);
        }
        return result;
    }

    public async getLabTestByUserAndType(testid: number, id: number): Promise<any>{
    }

    public async getCategory(): Promise<any>{
        return await getRepository(LabTestCategoryEntity)
        .createQueryBuilder('category2')
        .getMany();
    }
}