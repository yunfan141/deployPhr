import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {LabTestEntity} from '../LabTest/LabTest.entity';
import {ContactsEntity} from '../Contacts/Contacts.entity';

@Entity()
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    gender: string;

    @Column()
    age: number;

    @OneToMany(type => LabTestEntity, labTest => labTest.user)
    labTests: labTest[];

    @OneToMany(type => ContactsEntity, contact => contact.user)
    contacts: contact[];

}