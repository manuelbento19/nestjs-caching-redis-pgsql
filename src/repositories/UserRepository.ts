import { User } from "src/entities/User";

export abstract class UserRepository{
    abstract get(): Promise<User[]>;
    abstract findById(id: string): Promise<User>;
    abstract findByEmail(email:string): Promise<User>;
    abstract delete(id:string): Promise<void>;
}