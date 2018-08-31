import { Component , Inject} from '@nestjs/common';
import {Repository, getRepository, getConnection} from 'typeorm';
import {UsersEntity} from '../User/users.entity';
import {ResourceEntity} from '../Resource/resource.entity';

@Component()
export class ResourceService {
    constructor(
    ){}

    public async addResource(id: number, info: any){
        const theUser = await getRepository(UsersEntity)
        .createQueryBuilder('user')
        .where('user.id = :name', { name: id })
        .getOne();
        const resource = new Object();
        resource.user = theUser;
        resource.info = info;
        return await getRepository(ResourceEntity).save(resource);
    }

    public async getResource(id: number){
        const userAndResource = await getRepository(UsersEntity)
        .createQueryBuilder('users')
        .leftJoinAndSelect('users.resources', 'resources')
        .where('users.id = :name', {name: id})
        .getOne();
        const result = [];
        if (userAndResource === undefined){
            return result;
        }
        const ResourceInfo = userAndResource.resources.map((item) => item.info);
        return ResourceInfo;
    }

    public async deleteResource(id: number, resourceid: number){
        const userAndResource = await getRepository(UsersEntity)
        .createQueryBuilder('users')
        .leftJoinAndSelect('users.resources', 'resources')
        .where('users.id = :name', {name: id})
        .getOne();
        if (userAndResource === undefined){
            return null;
        }
        const ResourceInfo = userAndResource.resources;
        const deleteId = ResourceInfo[resourceid];
        console.log(deleteId);
        // return await getRepository(ResourceEntity)
        // .delete(deleteId);
        return await this.ResourceRepository.delete(deleteId);
    }
}