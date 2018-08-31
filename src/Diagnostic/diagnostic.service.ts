import { Component , Inject} from '@nestjs/common';
import {Repository, getRepository, getConnection} from 'typeorm';
import {UsersEntity} from '../User/users.entity';
import {DiagnosticEntity} from '../Diagnostic/Diagnostic.entity';

@Component()
export class DiagnosticsService {
    constructor(
    ){}

    public async addDiagnostics(id: number, typeid: number, info: any){
        const theUser = await getRepository(UsersEntity)
        .createQueryBuilder('user')
        .where('user.id = :name', { name: id })
        .getOne();
        const diagnostic = new Object();
        diagnostic.user = theUser;
        diagnostic.info = info;
        diagnostic.typeid = typeid;
        return await getRepository(DiagnosticEntity).save(diagnostic);
    }

    public async getRecentDiagnostics(id: number, days: number){
        const nowDate = new Date();
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(nowDate.getDate() + days);
        startDate.setDate(nowDate.getDate() - days);
        const result = [];
        const userAndDiagnostics = await getRepository(UsersEntity)
        .createQueryBuilder('users')
        .leftJoinAndSelect('users.diagnostics', 'diagnostics')
        .where('users.id = :name', {name: id})
        .getOne();
        for (const item of userAndDiagnostics.diagnostics){
            const temp = item.info;
            const itemDate = new Date(temp.date);
            if (itemDate.getTime() > startDate.getTime() && itemDate.getTime() < endDate.getTime()){
                temp.type = item.typeid;
                result.push(temp);
            }
        }
    }

    public async getDiagnostics(id: number, typeid: number){
        const finalresult = [];
        const userAndDiagnostics = await getRepository(UsersEntity)
        .createQueryBuilder('users')
        .leftJoinAndSelect('users.diagnostics', 'diagnostics')
        .where('users.id = :name', {name: id})
        .andWhere('diagnostics.typeid = :typename', {typename: typeid})
        .getOne();
        if (userAndDiagnostics === undefined){
            return finalresult;
        }
        const DiagnosticsInfo = userAndDiagnostics.diagnostics.map((item) => item.info);
        DiagnosticsInfo.sort(function compare(a, b) {
            if (a.date < b.date) {
              return -1;
            }
            if (a.date > b.date) {
              return 1;
            }
            return 0;
        });
        // tslint:disable-next-line:triple-equals
        if (typeid == 2 || typeid == 3 || typeid == 4 || typeid == 5){
            function diagnosticItem(organ, results){
                this.organ = organ;
                this.results = results;
            }
            const organSet = new Set();
            DiagnosticsInfo.forEach( (item) => {
                organSet.add(item.organ);
            });
            for (const organ of organSet){
                const results = [];
                DiagnosticsInfo.forEach( (item) => {
                    if (item.organ === organ){
                        delete item.organ;
                        results.push(item);
                    }
                });
                finalresult.push(new diagnosticItem(organ, results));
            }
        }
        else{
            function diagnosticItem2(testname, results){
                this.testname = testname;
                this.results = results;
            }
            const nameSet = new Set();
            DiagnosticsInfo.forEach( (item) => {
                nameSet.add(item.testname);
            });
            for (const testname of nameSet){
                const results = [];
                DiagnosticsInfo.forEach( (item) => {
                    if (item.testname === testname){
                        delete item.testname;
                        results.push(item);
                    }
                });
                finalresult.push(new diagnosticItem2(testname, results));
            }
        }
        return finalresult;
    }

    public async deleteDiagnostic(id: number, typeid: number, subtypeid: number, resultid: number){
        const result = await this.getDiagnostics(id, typeid);
        if (typeid == 2 || typeid == 3 || typeid == 4 || typeid == 5){
            const item = result[subtypeid].results[resultid];
            const organ = result[subtypeid].organ;
            item.organ = organ;
            console.log(item);
            const theDiagnostic = await getRepository(DiagnosticEntity)
            .createQueryBuilder('dig')
            .where('dig.typeid = :name', { name: typeid})
            .andWhere('dig.info = :info', {info: item})
            .getOne();
            console.log(theDiagnostic);
            return await getRepository(DiagnosticEntity).delete(theDiagnostic);
        }
        else{
            const item = result[subtypeid].results[resultid];
            const name = result[subtypeid].name;
            item.name = name;
            console.log(item);
            const theDiagnostic = await getRepository(DiagnosticEntity)
            .createQueryBuilder('dig')
            .where('dig.typeid = :name', { name: typeid})
            .andWhere('dig.info = :info', {info: item})
            .getOne();
            console.log(theDiagnostic);
            return await getRepository(DiagnosticEntity).delete(theDiagnostic);
        }
    }
}