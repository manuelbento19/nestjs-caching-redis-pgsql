import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { User } from "src/entities/User";
import { UserRepository } from "src/repositories/UserRepository";

@Injectable()
export class UserRepositorySQLite implements UserRepository{
    constructor(private prismaService: PrismaService){
        
    }
    async get(): Promise<User[]> {
        const users = await this.prismaService.user.findMany(); 
        return users;
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