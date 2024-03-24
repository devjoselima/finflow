import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaUsersRepository } from 'src/repositories/prisma/users.repository';
import { CreateUserDto } from './dto/create-user.dto';

import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: PrismaUsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const emailAlreadyInUse = await this.usersRepository.findByEmail(email);

    const hashedPassword = await hash(password, 12);

    if (emailAlreadyInUse) {
      throw new ConflictException('This email is already in use');
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
