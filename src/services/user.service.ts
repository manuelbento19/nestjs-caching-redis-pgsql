import {Injectable} from '@nestjs/common'
import { UserRepository } from 'src/repositories/UserRepository';
import { ErrorHandler } from 'src/utils/ErrorHandler';

@Injectable()
export class UserService{
    constructor(private readonly userRepository:UserRepository){}

    async get(){
        const users = this.userRepository.get();
        return users;
    }
    async findById(id: string){
        if(!id)
        throw new ErrorHandler("You must insert the user id");

        const user = await this.userRepository.findById(id);
        if(!user)
        throw new ErrorHandler("User doesn't exists.");
        
        return user;
    }
    async findByEmail(email: string){
        if(!email)
        throw new ErrorHandler("You must insert the user email");

        const user = await this.userRepository.findByEmail(email);
        if(!user)
        throw new ErrorHandler("User doesn't exists.");
        
        return user;
    }
    async delete(id: string){
        if(!id)
        throw new ErrorHandler("You must insert the user id");

        const user = await this.userRepository.findByEmail(id);
        if(!user)
        throw new ErrorHandler("User doesn't exists.");
        
        await this.userRepository.delete(id);
    }
}