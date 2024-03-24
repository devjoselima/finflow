import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PasswordHasherAdapter } from 'src/adapters/password-hasher';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PasswordHasherAdapter],
})
export class UsersModule {}
