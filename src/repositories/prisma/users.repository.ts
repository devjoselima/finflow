import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { type Prisma } from '@prisma/client';
import { IUsersRepository } from '../interfaces/users.repository';

@Injectable()
export class PrismaUsersRepository implements IUsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.UserCreateInput) {
    const user = await this.prismaService.user.create({
      data: {
        ...createDto,
        categories: {
          createMany: {
            data: [
              // Income
              { name: 'Salário', icon: 'salary', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },
              // Expense
              { name: 'Casa', icon: 'home', type: 'EXPENSE' },
              { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
              { name: 'Educação', icon: 'education', type: 'EXPENSE' },
              { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
              { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
              { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
              { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
              { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
              { name: 'Outro', icon: 'other', type: 'EXPENSE' },
            ],
          },
        },
      },
    });

    return user;
  }

  findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  findById(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
      select: {
        name: true,
        email: true,
      },
    });
  }
}
