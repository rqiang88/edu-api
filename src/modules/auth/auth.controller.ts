import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto as C } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body() createAuthDto: C) {
    return this.authService.create(createAuthDto);
  }
}
