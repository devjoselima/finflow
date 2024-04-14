import { Injectable } from '@nestjs/common';

import { PrismaUsersRepository } from 'src/repositories/prisma/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: PrismaUsersRepository) {}

  getUserById(userId: string) {
    return this.usersRepository.findById(userId);
  }
}
