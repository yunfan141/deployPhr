import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {UsersEntity} from '../User/users.entity';

@Entity()
export class ResourceEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column('jsonb')
    info: any;

    @ManyToOne(type => UsersEntity, user => user.resources)
    user: UsersEntity;
}