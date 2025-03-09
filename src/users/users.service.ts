import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ){}

  async getUser(username: string) {
    const userFound = await this.userRepository.findOne({
      where: { username },
    })
    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return userFound
  }
}
