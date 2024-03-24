import { Global, Module } from '@nestjs/common';
import { PrismaUsersRepository } from './prisma/users.repository';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Global()
@Module({
  providers: [PrismaService, PrismaUsersRepository],
  exports: [PrismaUsersRepository],
})
export class DatabaseModule {}
