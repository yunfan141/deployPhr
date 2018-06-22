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
        const theSubtest = theTest.subtest;
        if (theSubtest.find(item => item === subtest) === undefined){
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
            const testid = test.id;
            const testresult = await getRepository(LabTestEntity)
            .createQueryBuilder('labtest')
            .leftJoinAndSelect('labtest.test', 'test')
            .where('labtest.id = :name', {name: testid})
            .andWhere('labtest.abnormal = :abnormal', {abnormal: false})
            .orderBy('labtest.date', 'DESC')
            .getOne();
            const testCategory = testresult.test;
            console.log(testCategory);
            const abnormalTest = new Object();
            abnormalTest.id = testCategory.id;
            abnormalTest.name = testCategory.name;
            abnormalTest.unit = testCategory.unit;
            abnormalTest.isnumber = testCategory.isnumber;
            abnormalTest.result = test.result;
            abnormalTest.abnormal = test.abnormal;
            abnormalTest.date = test.date;
            abnormalTest.note = test.note;
            result.push(abnormalTest);
        }
        return result;
    }

    public async getLabTestByUserAndType(categoryid: number, id: number): Promise<any>{
        const selectedLabTest = await getRepository(UsersEntity)
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.labTests', 'labTests')
            .where('users.id = :name', {name: id})
            .orderBy('labTests.date', 'DESC')
            .getOne();
        const finalresult = [];
        function testitem(subtest, result){
            this.subtest = subtest;
            this.results = result;
        }
        for (const test of selectedLabTest.labTests){
            console.log(test);
            const theTest = test.id;
            const testresult = await getRepository(LabTestEntity)
            .createQueryBuilder('labtest')
            .leftJoinAndSelect('labtest.test', 'test')
            .where('labtest.id = :name', {name: theTest})
            .andWhere('labtest.abnormal = :abnormal', {abnormal: false})
            .andWhere('test.id = :idname', {idname: categoryid})
            .orderBy('labtest.date', 'DESC')
            .getOne();
            console.log(test);
            if (testresult !== undefined){
                if (finalresult === null){
                    const subtest = test.subtest;
                    delete test.id;
                    delete test.subtest;
                    const result = [];
                    result.push(test);
                    const theTestitem = new testitem(subtest, result);
                    finalresult.push(theTestitem);
                }
                let flag = 0;
                for (const item of finalresult){
                    if (item.subtest === test.subtest){
                        delete test.id;
                        delete test.subtest;
                        item.results.push(test);
                        flag = 1;
                    }
                }
                if (flag === 0){
                    const subtest = test.subtest;
                    delete test.id;
                    delete test.subtest;
                    const result = [];
                    result.push(test);
                    const theTestitem = new testitem(subtest, result);
                    finalresult.push(theTestitem);
                }

            }

            console.log(finalresult);
        }
        return finalresult;
    }

    public async getCategory(): Promise<any>{
        return await getRepository(LabTestCategoryEntity)
        .createQueryBuilder('category2')
        .getMany();
    }
}