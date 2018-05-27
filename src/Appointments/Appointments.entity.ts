import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {UsersEntity} from '../User/users.entity';

@Entity()
export class AppointmentsEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column('date')
    date: any;

    @Column()
    time: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    location: string;

    @ManyToOne(type => UsersEntity, user => user.appointments)
    user: UsersEntity;

}