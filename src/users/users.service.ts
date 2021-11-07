import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ email });
    return user !== undefined ? user : null;
  }

  async signUp(data: User): Promise<User> {
    const user = await this.findByEmail(data.email);
    if (user === null) {
      const user = this.usersRepository.create({ ...data });
      await this.usersRepository.save(user);
      return user;
    }
    throw new BadRequestException('User exists!');
  }
}
