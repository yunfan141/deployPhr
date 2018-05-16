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
    relation: string;

    @Column('simple-array')
    location: string[];

    @Column()
    group: string;

    @ManyToOne(type => UsersEntity, user => user.contacts)
    user: UsersEntity;
}