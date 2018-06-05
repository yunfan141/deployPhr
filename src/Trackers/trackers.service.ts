import { Component , Inject} from '@nestjs/common';
import {Repository, getRepository, getConnection} from 'typeorm';
import {UsersEntity} from '../User/users.entity';
import {TrackersEntity} from '../Trackers/Trackers.entity';

@Component()
export class TrackersService {
    constructor(
    ){}

    public async addTrackers(id: number, type: string, info: any){
        const theUser = await getRepository(UsersEntity)
        .createQueryBuilder('user')
        .where('user.id = :name', { name: id })
        .getOne();
        const tracker = new Object();
        tracker.user = theUser;
        tracker.info = info;
        tracker.type = type;
        return await getRepository(TrackersEntity).save(tracker);
    }

    public async getTrackers(id: number, type: string){
        const userAndTrackers = await getRepository(UsersEntity)
        .createQueryBuilder('users')
        .leftJoinAndSelect('users.trackers', 'trackers')
        .where('users.id = :name', {name: id})
        .getOne();
        const thisTypeTrackersInfo = [];
        for (const thetrackers of userAndTrackers.trackers){
            if (thetrackers.type === type){
                thisTypeTrackersInfo.push(thetrackers.info);
            }
        }
        return thisTypeTrackersInfo;
    }

    public async getReminderTrackers(id: number){
        const userAndTrackers = await getRepository(UsersEntity)
        .createQueryBuilder('users')
        .leftJoinAndSelect('users.Trackers', 'Trackers')
        .where('users.id = :name', {name: id})
        .getOne();
        const trackers = userAndTrackers.trackers;
        const nowDate = new Date();
        const endDate = new Date();
        endDate.setDate(nowDate.getDate() + 3);
        const reminderTrackers = [];
        for (const thetracker of trackers){
            const trackerDate = new Date(thetracker.date);
            if (trackerDate.getTime() > nowDate.getTime() && trackerDate.getTime() < endDate.getTime()){
                    reminderTrackers.push(thetracker);
            }
        }
        return reminderTrackers;
    }
}