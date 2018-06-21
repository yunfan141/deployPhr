import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {UsersEntity} from '../User/users.entity';

@Entity()
export class RecordsEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column('jsonb')
    info: any;

    @ManyToOne(type => UsersEntity, user => user.records)
    user: UsersEntity;
}