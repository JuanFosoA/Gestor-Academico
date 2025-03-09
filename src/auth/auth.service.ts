import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ username, password }: AuthPayloadDto) {
    const userFound = await this.userService.getUser(username);

    if (userFound.password === password) {
      const { password, ...user } = userFound;
      return this.jwtService.sign(user);
    } 
  }
}
