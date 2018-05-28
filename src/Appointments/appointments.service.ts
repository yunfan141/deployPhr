import { Component , Inject} from '@nestjs/common';
import {Repository, getRepository, getConnection} from 'typeorm';
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
        // get null
        // await ?
        const userAndAppointments = await getRepository(UsersEntity)
        .createQueryBuilder('users')
        .leftJoinAndSelect('users.appointments', 'appointments')
        .where('users.id = :name', {name: id})
        .getOne();
        return userAndAppointments.appointments;
    }

    public async getReminderAppointments(id: number){
        const userAndAppointments = await getRepository(UsersEntity)
        .createQueryBuilder('users')
        .leftJoinAndSelect('users.appointments', 'appointments')
        .where('users.id = :name', {name: id})
        .getOne();
        const appointments = userAndAppointments.appointments;
        const nowDate = new Date();
        const endDate = new Date();
        endDate.setDate(nowDate.getDate() + 3);
        const reminderAppointments = [];
        for (const theAppointment of appointments){
            const appointmentDate = new Date(theAppointment.date);
            if (appointmentDate.getTime() > nowDate.getTime() && appointmentDate.getTime() < endDate.getTime()){
                    console.log(nowDate);
                    console.log(appointmentDate);
                    console.log('date');
                    reminderAppointments.push(theAppointment);
            }
        }
        return reminderAppointments;
    }
}