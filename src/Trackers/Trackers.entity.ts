import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {UsersEntity} from '../User/users.entity';

@Entity()
export class TrackersEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column('jsonb')
    info: any;

    @ManyToOne(type => UsersEntity, user => user.trackers)
    user: UsersEntity;
}