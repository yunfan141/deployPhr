import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {UsersEntity} from '../User/users.entity';

@Entity()
export class ContactsEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    tel: string;

    @Column({ nullable: true })
    fax: string;

    @Column({ nullable: true })
    relationship: string;

    @Column({ nullable: true })
    specialty: string;

    @Column({ nullable: true })
    location1: string;

    @Column({ nullable: true })
    location2: string;

    @Column({ nullable: true })
    location3: string;

    @Column()
    group: string;

    @ManyToOne(type => UsersEntity, user => user.contacts)
    user: UsersEntity;
}