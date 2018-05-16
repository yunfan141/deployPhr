import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {UsersEntity} from '../User/users.entity';

@Entity()
export class LabTestEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type1: string;

    @Column()
    type2: string;

    @Column('date')
    date: any;

    @Column('jsonb')
    info: any;

    @ManyToOne(type => UsersEntity, user => user.labTests)
    user: UsersEntity;
}