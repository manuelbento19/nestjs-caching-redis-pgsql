import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { PrismaService } from './database/prisma.service';
import { UserRepository } from './repositories/UserRepository';
import { UserRepositorySQLite } from './repositories/implementations/prisma/UserRepositorySQLite';
import { UserService } from './services/user.service';

@Module({
  imports: [],
  controllers: [
    UserController
  ],
  providers: [
    UserService,
    PrismaService,
    {
      provide: UserRepository,
      useClass: UserRepositorySQLite
    }
  ],
})
export class AppModule {}
