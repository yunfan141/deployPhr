import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {UsersEntity} from '../User/users.entity';
import {LabTestCategoryEntity} from './LabTestCategory.entity';

@Entity()
export class LabTestEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    result: string;

    @Column()
    abnormal: string;

    @Column('date')
    date: any;

    @Column()
    note: string;

    @Column()
    subtest: string;

    @Column({ nullable: true })
    unit: string;

    @ManyToOne(type => UsersEntity, user => user.labTests)
    user: UsersEntity;

    @ManyToOne(type => LabTestCategoryEntity, test => test.labTests)
    test: LabTestCategoryEntity;
}