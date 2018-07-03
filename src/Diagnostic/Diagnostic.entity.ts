import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {UsersEntity} from '../User/users.entity';

@Entity()
export class DiagnosticEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    typeid: number;

    @Column('jsonb')
    info: any;

    @ManyToOne(type => UsersEntity, user => user.diagnostics)
    user: UsersEntity;
}