import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'src/config/env';

@Module({
  imports: [
    JwtModule.register({
      signOptions: { expiresIn: '1d' },
      secret: env.jwtSecret,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
