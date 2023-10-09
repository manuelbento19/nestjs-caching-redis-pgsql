import {PrismaClient} from '@prisma/client'
import {faker} from '@faker-js/faker';


export class UserSeeder{
    private promises: Promise<any>[];
    
    constructor(private prisma:PrismaClient){
        this.promises = [];
    }
    async start(){
        await this.prisma.user.deleteMany();
        for(var index=0; index<220; index++){
            let firstName =faker.person.firstName();
            let lastName =  faker.person.lastName();
            this.promises.push(
                this.prisma.user.create({
                    data: {
                        firstName,
                        lastName,
                        country: faker.location.country(),
                        city: faker.location.city(),
                        street: faker.location.street(),
                        phone: faker.phone.number(),
                        image: faker.internet.avatar(),
                        email: faker.internet.email({firstName,lastName}),
                        password: faker.internet.password({length: 12}),
                    }
                })
            )
        }
        await Promise.all(this.promises);
    }
}
