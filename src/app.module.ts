import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { PrismaService } from './database/prisma.service';
import { UserRepository } from './repositories/UserRepository';
import { UserService } from './services/user.service';
import { UserRepositoryRedis } from './repositories/implementations/cache/UserRepositoryRedis';
import { RedisService } from './services/redis.service';

@Module({
  imports: [],
  controllers: [
    UserController
  ],
  providers: [
    UserService,
    PrismaService,
    RedisService,
    {
      provide: UserRepository,
      useClass: UserRepositoryRedis
    }
  ],
})
export class AppModule {}
