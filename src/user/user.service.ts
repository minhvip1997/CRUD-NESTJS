import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EditPostDto } from 'src/post/dtos';
import { Repository } from 'typeorm';
import { CreateUserDto, EditUserDto } from './dtos';
import { UserEntity } from './entities';


export interface UserFindOne{
    id?: number;
    email?: string;
}

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ){}

    async getMany(){
        return await this.userRepository.find();
    }

    async getOne(id :number){
        const user = await this.userRepository.findOne(id);
        if(!user) throw new NotFoundException(' user dont exist')
        return user;
    }

    async createOne(dto: CreateUserDto){
        const userExist = await this.userRepository.findOne({ email: dto.email})

        if(userExist) throw new NotFoundException(' user register exist email')

        const newUser = this.userRepository.create(dto);

        const user =  await this.userRepository.save(newUser);

        delete user.password;
        return user;
    }

    async editOne(id: number, dto: EditUserDto){
        const user = await this.getOne(id)
        const editUser = Object.assign(user, dto);

         return await this.userRepository.save(editUser);
    }

    async deleteOne(id: number){
        const user = await this.getOne(id);
        return await this.userRepository.remove(user);
    }

    async findOne(data: UserFindOne){
        return await this.userRepository.createQueryBuilder('user').where(data)
        .addSelect('user.password').getOne()
    }
}
