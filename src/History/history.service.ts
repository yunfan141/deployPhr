import { Component , Inject} from '@nestjs/common';
import {Repository, getRepository, getConnection} from 'typeorm';
import {UsersEntity} from '../User/users.entity';
import {HistoryEntity} from '../History/History.entity';

@Component()
export class HistoryService {
    constructor(
    ){}

    public async addHistory(id: number, type: string, info: any){
        const theUser = await getRepository(UsersEntity)
        .createQueryBuilder('user')
        .where('user.id = :name', { name: id })
        .getOne();
        const history = new Object();
        history.user = theUser;
        history.info = info;
        history.type = type;
        return await getRepository(HistoryEntity).save(history);
    }

    public async addSocialHistory(id: number, socialType: string, info: any){
        const theUser = await getRepository(UsersEntity)
        .createQueryBuilder('user')
        .where('user.id = :name', { name: id })
        .getOne();
        const socialHistory = new Object();
        socialHistory.user = theUser;
        info.socialType = socialType;
        socialHistory.info = info;
        socialHistory.type = 'social';
        return await getRepository(HistoryEntity).save(socialHistory); 
    }

    public async getSocialHistory(id: number){
        const userAndSocialHistory = await getRepository(UsersEntity)
        .createQueryBuilder('users')
        .leftJoinAndSelect('users.historys', 'historys')
        .where('users.id = :name', {name: id})
        .andWhere('historys.type = :typename', {typename: 'social'})
        .getOne();
        if (userAndSocialHistory === undefined){
            return [];
        }
        const socialHistoryInfo = userAndSocialHistory.historys.map((item) => item.info);
        socialHistoryInfo.sort(function compare(a, b) {
            if (a.date < b.date) {
              return -1;
            }
            if (a.date > b.date) {
              return 1;
            }
            return 0;
          });
        const socialHistoryList = {smoking: [], alcohol: [], drug: [], travel: [], housing: []};
        socialHistoryInfo.forEach((item) => {
            const socialType = item.socialType;
            delete item.socialType;
            socialHistoryList[socialType].push(item);
        });
        return socialHistoryList;
    }

    public async deleteSocialHistory(id: number, recordid: number, subtype: string){
        const userAndSocialHistory = await getRepository(UsersEntity)
        .createQueryBuilder('users')
        .leftJoinAndSelect('users.historys', 'historys')
        .where('users.id = :name', {name: id})
        .andWhere('historys.type = :typename', {typename: 'social'})
        .getOne();
        if (userAndSocialHistory === undefined){
            return null;
        }
        const socialHistoryInfo = userAndSocialHistory.historys;
        const socialHistoryList = {smoking: [], alcohol: [], drug: [], travel: [], housing: []};
        socialHistoryInfo.forEach((item) => {
            const socialType = item.info.socialType;
            socialHistoryList[socialType].push(item);
        });
        return await getRepository(HistoryEntity).delete(socialHistoryList[subtype][recordid]);
    }

    public async getHistory(id: number, type: string){
        const userAndHistory = await getRepository(UsersEntity)
        .createQueryBuilder('users')
        .leftJoinAndSelect('users.historys', 'historys')
        .where('users.id = :name', {name: id})
        .andWhere('historys.type = :typename', {typename: type})
        .getOne();
        if (userAndHistory === undefined){
            return [];
        }
        const historyInfo = userAndHistory.historys.map((item) => item.info);
        return historyInfo.sort(function compare(a, b) {
            if (a.date < b.date) {
              return -1;
            }
            if (a.date > b.date) {
              return 1;
            }
            return 0;
          });
    }

    public async deleteHistory(id: number, recordid: number, type: string){
        const userAndHistory = await getRepository(UsersEntity)
        .createQueryBuilder('users')
        .leftJoinAndSelect('users.historys', 'historys')
        .where('users.id = :name', {name: id})
        .andWhere('historys.type = :typename', {typename: type})
        .getOne();
        if (userAndHistory === undefined){
            return null;
        }
        const historyInfo = userAndHistory.historys;
        historyInfo.sort(function compare(a, b) {
            if (a.info.date < b.info.date) {
              return -1;
            }
            if (a.info.date > b.info.date) {
              return 1;
            }
            return 0;
          });
        return await getRepository(HistoryEntity).delete(historyInfo[recordid]);
    }

    public async getReminderHistory(id: number, days: number){
        const userAndHistory = await getRepository(UsersEntity)
        .createQueryBuilder('users')
        .leftJoinAndSelect('users.historys', 'historys')
        .where('users.id = :name', {name: id})
        .getOne();
        const History = userAndHistory.historys;
        const nowDate = new Date();
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(nowDate.getDate() + days);
        startDate.setDate(nowDate.getDate() - days);
        const res = [];
        for (const thehistory of History){
            const item = thehistory.info;
            item.type = thehistory.type;
            const historyDate = new Date(thehistory.info.date);
            if (historyDate.getTime() > startDate.getTime() && historyDate.getTime() < endDate.getTime()){
                    res.push(item);
            }
        }
        return res.sort(function compare(a, b) {
            if (a.date < b.date) {
              return -1;
            }
            if (a.date > b.date) {
              return 1;
            }
            return 0;
          });
    }
}