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
}