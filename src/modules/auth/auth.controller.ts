import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { isPublic } from 'src/decorators/isPublic';

@Controller('auth')
@isPublic()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() authenticateDto: SignInDto) {
    return this.authService.signIn(authenticateDto);
  }

  @Post('signup')
  signUp(@Body() signupDto: SignUpDto) {
    return this.authService.signUp(signupDto);
  }
}
