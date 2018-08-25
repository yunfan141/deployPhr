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
                id: 0,
                name: 'oher',
                subtest: ['other'],
            },
            {
                id: 1,
                name: 'ANA',
                subtest: ['AAA'],
            },
            {
                id: 2,
                name: 'BMP (Basic Metabolic Panel)',
                subtest: ['BMP (Basic Metabolic Panel)'],
            },
            {
                id: 3,
                name: 'PTT (Partial Thromboplastin Time)',
                subtest: ['PTT (Partial Thromboplastin Time)'],
            },
            {
                id: 4,
                name: 'Glycohemoglobin (Hemoglobin A1C)',
                subtest: ['Glycohemoglobin (Hemoglobin A1C)'],
            },
            {
                id: 5,
                name: 'CBC (Complete Blood Count)',
                subtest: ['CBC (Complete Blood Count)'],
            },
            {
                id: 6,
                name: 'CMP (Comprehensive Metabolic Panel)',
                subtest: ['CMP (Comprehensive Metabolic Panel)'],
            },
            {
                id: 7,
                name: 'ESR (Sedimentation Rate)',
                subtest: ['ESR (Sedimentation Rate)'],
            },
            {
                id: 8,
                name: 'Flu (Influenza A and B Screen)',
                subtest: ['Flu (Influenza A and B Screen)'],
            },
            {
                id: 9,
                name: 'Glucose Level',
                subtest: ['Glucose Level'],
            },
            {
                id: 10,
                name: 'hCG',
                subtest: ['hCG'],
            },
            {
                id: 11,
                name: 'HIV Antibody (HIV 1/2 Ag/Ab 4th Generation with Reflex)',
                subtest: ['HIV Antibody (HIV 1/2 Ag/Ab 4th Generation with Reflex)'],
            },
            {
                id: 12,
                name: 'Lipid Panel (or Lipid Profile)',
                subtest: ['Lipid Panel (or Lipid Profile)'],
            },
            {
                id: 13,
                name: 'Liver Function Panel (LFT)',
                subtest: ['Liver Function Panel (LFT)'],
            },
            {
                id: 14,
                name: 'Lyme Antibody w/Reflex Immunoblot',
                subtest: ['Lyme Antibody w/Reflex Immunoblot'],
            },
            {
                id: 15,
                name: 'Microalbumin, Urine',
                subtest: ['Microalbumin, Urine'],
            },
            {
                id: 16,
                name: 'Mono',
                subtest: ['Mono'],
            },
            {
                id: 17,
                name: 'Pap Smear',
                subtest: ['Pap Smear'],
            },
            {
                id: 18,
                name: 'PSA (Prostate Specific Antigen)',
                subtest: ['PSA (Prostate Specific Antigen)'],
            },
            {
                id: 19,
                name: 'PT (Protime)',
                subtest: ['PT (Protime)'],
            },
            {
                id: 20,
                name: 'Semen Analysis',
                subtest: ['Semen Analysis'],
            },
            {
                id: 21,
                name: 'Stool Culture',
                subtest: ['Stool Culture'],
            },
            {
                id: 22,
                name: 'TSH, High Sensitivity (Thyroid Stimulating Hormone)',
                subtest: ['TSH, High Sensitivity (Thyroid Stimulating Hormone)'],
            },
        ])
        .execute();
    }

    public async addLabTest(testid: number, id: number, subtest: string,
                            result: number, unit: string, abnormal: boolean, note: string, date: Date): Promise<LabTestEntity>{
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
        labTest.unit = unit;
        labTest.abnormal = abnormal;
        labTest.subtest = subtest;
        labTest.test = theTest;
        return await this.labTestRepository.save(labTest);
    }

    public async getLabTestByUser(id: number, days: number): Promise<any>{
        const selectedLabTest = await getRepository(UsersEntity)
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.labTests', 'labTests')
            .where('users.id = :name', {name: id})
            .orderBy('labTests.date', 'DESC')
            .getOne();
        const result = [];
        if (selectedLabTest === undefined){
            return result;
        }
        for (const test of selectedLabTest.labTests){
            console.log(test);
            const testid = test.id;
            const testresult = await getRepository(LabTestEntity)
            .createQueryBuilder('labtest')
            .leftJoinAndSelect('labtest.test', 'test')
            .where('labtest.id = :name', {name: testid})
            .orderBy('labtest.date', 'DESC')
            .getOne();
            if (testresult !== undefined){
                const testCategory = testresult.test;
                console.log(testCategory);
                const abnormalTest = new Object();
                abnormalTest.id = testCategory.id;
                abnormalTest.name = testCategory.name;
                abnormalTest.result = test.result;
                abnormalTest.unit = test.unit;
                abnormalTest.abnormal = test.abnormal;
                abnormalTest.date = test.date;
                abnormalTest.note = test.note;
                result.push(abnormalTest);
            }
        }
        const nowDate = new Date();
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(nowDate.getDate() + days);
        startDate.setDate(nowDate.getDate() - days);
        const recentResult = [];
        for (const theRecentResult of result){
            const testDate = new Date(theRecentResult.date);
            if (testDate.getTime() > startDate.getTime() && testDate.getTime() < endDate.getTime()){
                recentResult.push(theRecentResult);
            }
        }
        return recentResult.sort(function compare(a, b) {
            if (a.date < b.date) {
              return -1;
            }
            if (a.date > b.date) {
              return 1;
            }
            return 0;
          });
    }

    public async getLabTestByUserAndType(categoryid: number, id: number): Promise<any>{
        const selectedLabTest = await getRepository(UsersEntity)
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.labTests', 'labTests')
            .where('users.id = :name', {name: id})
            .orderBy('labTests.date', 'DESC')
            .getOne();
        const finalresult = [];
        if (selectedLabTest === undefined){
            return finalresult;
        }
        function testitem(subtest, unit, result){
            this.subtest = subtest;
            this.unit = unit;
            this.results = result;
        }
        for (const test of selectedLabTest.labTests){
            console.log(test);
            const theTest = test.id;
            const testresult = await getRepository(LabTestEntity)
            .createQueryBuilder('labtest')
            .leftJoinAndSelect('labtest.test', 'test')
            .where('labtest.id = :name', {name: theTest})
            .andWhere('test.id = :idname', {idname: categoryid})
            .orderBy('labtest.date', 'DESC')
            .getOne();
            console.log(test);
            if (testresult !== undefined){
                if (finalresult === null){
                    const subtest = test.subtest;
                    const unit = test.unit;
                    delete test.id;
                    delete test.subtest;
                    delete test.unit;
                    const result = [];
                    result.push(test);
                    result.sort(function compare(a, b) {
                        if (a.date < b.date) {
                          return -1;
                        }
                        if (a.date > b.date) {
                          return 1;
                        }
                        return 0;
                      });
                    const theTestitem = new testitem(subtest, unit, result);
                    finalresult.push(theTestitem);
                }
                let flag = 0; // indicate if there is  subset already exist
                for (const item of finalresult){
                    if (item.subtest === test.subtest){
                        if (test.unit != null){
                            item.unit = test.unit;
                        }
                        delete test.id;
                        delete test.subtest;
                        delete test.unit;
                        item.results.push(test);
                        item.results.sort(function compare(a, b) {
                            if (a.date < b.date) {
                              return -1;
                            }
                            if (a.date > b.date) {
                              return 1;
                            }
                            return 0;
                          });
                        flag = 1;
                    }
                }
                if (flag === 0){
                    const subtest = test.subtest;
                    const unit = test.unit;
                    delete test.id;
                    delete test.subtest;
                    delete test.unit;
                    const result = [];
                    result.push(test);
                    result.sort(function compare(a, b) {
                        if (a.date < b.date) {
                          return -1;
                        }
                        if (a.date > b.date) {
                          return 1;
                        }
                        return 0;
                      });
                    const theTestitem = new testitem(subtest, unit, result);
                    finalresult.push(theTestitem);
                }

            }

            console.log(finalresult);
        }
        return finalresult;
    }

    public async deleteLabtest(categoryid: number, subtestid: number, resultid: number, id: number){
        const selectedLabTest = await getRepository(UsersEntity)
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.labTests', 'labTests')
            .where('users.id = :name', {name: id})
            .orderBy('labTests.date', 'DESC')
            .getOne();
        const finalresult = [];
        function testitem(subtest, unit, result){
            this.subtest = subtest;
            this.unit = unit;
            this.results = result;
        }
        for (const test of selectedLabTest.labTests){
            console.log(test);
            const theTest = test.id;
            const testresult = await getRepository(LabTestEntity)
            .createQueryBuilder('labtest')
            .leftJoinAndSelect('labtest.test', 'test')
            .where('labtest.id = :name', {name: theTest})
            .andWhere('test.id = :idname', {idname: categoryid})
            .orderBy('labtest.date', 'DESC')
            .getOne();
            console.log(test);
            if (testresult !== undefined){
                if (finalresult === null){
                    const subtest = test.subtest;
                    const unit = test.unit;
                    delete test.id;
                    delete test.subtest;
                    delete test.unit;
                    const result = [];
                    result.push(test);
                    result.sort(function compare(a, b) {
                        if (a.date < b.date) {
                          return -1;
                        }
                        if (a.date > b.date) {
                          return 1;
                        }
                        return 0;
                      });
                    const theTestitem = new testitem(subtest, unit, result);
                    finalresult.push(theTestitem);
                }
                let flag = 0; // indicate if there is  subset already exist
                for (const item of finalresult){
                    if (item.subtest === test.subtest){
                        if (test.unit != null){
                            item.unit = test.unit;
                        }
                        delete test.subtest;
                        delete test.unit;
                        item.results.push(test);
                        item.results.sort(function compare(a, b) {
                            if (a.date < b.date) {
                              return -1;
                            }
                            if (a.date > b.date) {
                              return 1;
                            }
                            return 0;
                          });
                        flag = 1;
                    }
                }
                if (flag === 0){
                    const subtest = test.subtest;
                    const unit = test.unit;
                    delete test.subtest;
                    delete test.unit;
                    const result = [];
                    result.push(test);
                    result.sort(function compare(a, b) {
                        if (a.date < b.date) {
                          return -1;
                        }
                        if (a.date > b.date) {
                          return 1;
                        }
                        return 0;
                      });
                    const theTestitem = new testitem(subtest, unit, result);
                    finalresult.push(theTestitem);
                }

            }

            console.log(finalresult);
        }
        const theLabtestId = finalresult[subtestid].results[resultid].id;
        return this.labTestRepository.delete(theLabtestId);
    }

    public async getCategory(): Promise<any>{
        return await getRepository(LabTestCategoryEntity)
        .createQueryBuilder('category2')
        .getMany();
    }
}