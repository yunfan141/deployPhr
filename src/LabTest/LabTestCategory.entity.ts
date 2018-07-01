import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn, OneToMany} from 'typeorm';
import {LabTestEntity} from './LabTest.entity';
import { isNumber } from 'util';

@Entity()
export class LabTestCategoryEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column('simple-array')
    subtest: string[];

    @OneToMany(type => LabTestEntity, labTest => labTest.test)
    labTests: LabTestEntity[];
}