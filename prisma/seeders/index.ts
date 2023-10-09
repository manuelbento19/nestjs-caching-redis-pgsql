import {PrismaClient} from '@prisma/client';
import { UserSeeder } from "./user";

const prisma = new PrismaClient();
const userSeeder = new UserSeeder(prisma);

userSeeder
    .start()
    .then(async()=>await prisma.$disconnect())
    .catch(error=>{
        console.error("Error",error);
        prisma.$disconnect();
    })