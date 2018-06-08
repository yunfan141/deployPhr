import { Component , Inject} from '@nestjs/common';
import {Repository, getRepository, getConnection} from 'typeorm';
import {ContactsEntity} from './Contacts.entity';
import {UsersEntity} from '../User/users.entity';

@Component()
export class ContactsService {
    constructor(
    ){}

    public async addContacts(theContact: any, id: number): Promise<ContactsEntity>{
        const theUser = await getRepository(UsersEntity)
        .createQueryBuilder('user')
        .where('user.id = :name', { name: id })
        .getOne();
        theContact.user = theUser;
        return await getRepository(ContactsEntity).save(theContact);
    }

    public async getContactsByUser(id: number): Promise<any>{
        const selectedContacts = await getRepository(UsersEntity)
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.contacts', 'contacts')
            .where('users.id = :name', {name: id})
            .getOne();
        return selectedContacts.contacts;
    }

    public async getDoctorContacts(id: number): Promise<any>{
        const selectedContacts = await getRepository(UsersEntity)
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.contacts', 'contacts')
            .where('users.id = :name', {name: id})
            .getOne();
        // const selectedDoctors = selectedContacts.contacts.map((item) => {
        //     if (item.group.includes('doctor')){
        //         console.log('doctorssss');
        //         return item;
        //     }
        // });
        const selectedDoctors = [];
        for (const item of selectedContacts.contacts){
            if (item.group.includes('doctor')){
                item.locations = [];
                if (!item.location1){
                    item.locations.push(item.location1);
                }
                if (!item.location2){
                    item.locations.push(item.location2);
                }
                if (!item.location3){
                    item.locations.push(item.location3);
                }
                selectedDoctors.push(item);
            }
        }
        // const selectedDoctorsfinal = selectedDoctors.map((item) => {
        //     if (item !== undefined ){
        //         return item;
        //     }
        // });
        // const selectedDoctorsfinal = selectedDoctors.map((item) => {
        //     item.location = [];
        //     item.location.push(item.location1);
        //     item.location.push(item.location1);
        //     item.location.push(item.location1);
        // });
        return selectedDoctors;
    }
}