import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository:Repository<UserEntity>,
    ){}

    create(username:string,email:string,password:string,description:string):Promise<UserEntity>{
        const user = new UserEntity();
        user.username = username;
        user.email = email;
        user.password = password;
        user.description = description

        return this.userRepository.save(user)
    }

    findByEmail(email:string):Promise<UserEntity | undefined>{
        return this.userRepository.findOne({email})
    }
}
