import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  @HttpCode(201)
  async signUp(@Body() data: User) {
    return this.usersService.signUp(data);
  }
}
