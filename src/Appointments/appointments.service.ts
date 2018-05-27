import { Component , Inject} from '@nestjs/common';
import {Repository, getRepository, getConnection} from 'typeorm';
import {ContactsEntity} from './Contacts.entity';
import {UsersEntity} from '../User/users.entity';
import {AppointmentsEntity} from '../Appointments/Appointments.entity';

@Component()
export class AppointmentsService {
    constructor(
    ){}

    public async addAppointments(id: number, appointment: any){
        const theUser = await getRepository(UsersEntity)
        .createQueryBuilder('user')
        .where('user.id = :name', { name: id })
        .getOne();
        appointment.user = theUser;
        return await getRepository(AppointmentsEntity).save(appointment);
    }

    public async getAppointments(id: number){
        // return await getRepository(UsersEntity)
        // .createQueryBuilder('users')
        // .leftJoinAndSelect('users.appointments', 'appointments')
        // .where('users.id = :name', {name: id})
        // .getOne().appointments;
        // get null  why ?
        // await ?
        const userAndAppointments = await getRepository(UsersEntity)
        .createQueryBuilder('users')
        .leftJoinAndSelect('users.appointments', 'appointments')
        .where('users.id = :name', {name: id})
        .getOne();
        return userAndAppointments.appointments;
    }
}