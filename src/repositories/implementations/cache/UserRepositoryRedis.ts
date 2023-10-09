import {Injectable} from '@nestjs/common';
import { PrismaService } from "src/database/prisma.service";
import { User } from "src/entities/User";
import { UserRepository } from "src/repositories/UserRepository";
import { RedisService } from "src/services/redis.service";

@Injectable()
export class UserRepositoryRedis implements UserRepository{
    constructor(
        private redisService: RedisService,
        private prismaService: PrismaService
    ){}
    async get(): Promise<User[]> {
        const cachedUsers = await this.redisService.get("users");
        if(!cachedUsers){
            const users = await this.prismaService.user.findMany();
            await this.redisService.set("users",JSON.stringify(users),"EX",15);
            console.log('From database');
            return users; 
        }
        console.log('From cache')
        return JSON.parse(cachedUsers);
    }
    async findById(id: string): Promise<User> {
        const user = await this.prismaService.user.findFirst({
            where: {
                id
            }
        }); 
        return user;
    }
    async findByEmail(email: string): Promise<User> {
        const user = await this.prismaService.user.findFirst({
            where: {
                email
            }
        }); 
        return user;
    }
    async delete(id: string): Promise<void> {
        await this.prismaService.user.delete({
            where: {
                id
            }
        }); 
    }
    
}