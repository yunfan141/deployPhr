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
        const contact = new ContactsEntity();
        contact.user = theUser;
        contact.firstname = theContact.firstname;
        contact.lastname = theContact.lastname;
        contact.group = theContact.group;
        contact.tel = theContact.tel;
        contact.fax = theContact.fax;
        contact.location = [];
        for (const l of theContact.location){
            if (l !== ''){
                contact.location.push(l);
            }
        }
        contact.location;
        return await getRepository(ContactsEntity).save(contact);
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