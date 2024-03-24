import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import { PrismaUsersRepository } from 'src/repositories/prisma/users.repository';
import { PasswordHasherAdapter } from 'src/adapters/password-hasher';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: PrismaUsersRepository,
    private readonly passwordHasher: PasswordHasherAdapter,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const emailAlreadyInUse = await this.usersRepository.findByEmail(email);

    const hashedPassword = await this.passwordHasher.hash(password);
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
