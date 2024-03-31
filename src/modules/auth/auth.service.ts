import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { PasswordHasherAdapter } from 'src/adapters/password-hasher';

import { PrismaUsersRepository } from 'src/repositories/prisma/users.repository';

import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: PrismaUsersRepository,
    private readonly jwtService: JwtService,
    private readonly passwordHasher: PasswordHasherAdapter,
  ) {}

  private generateAccessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.generateAccessToken(user.id);

    return {
      accessToken,
    };
  }

  async signUp(signupDto: SignUpDto) {
    const { name, email, password } = signupDto;

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

    const accessToken = await this.generateAccessToken(user.id);
    return {
      accessToken,
    };
  }
}
