import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

/**
 * Servicio para gestionar los usuarios en el sistema.
 */
@Injectable()
export class UsersService {
  /**
   * Constructor del servicio de usuarios.
   * @param userRepository Repositorio de la entidad User.
   */
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ){}

  /**
   * Obtiene un usuario por su nombre de usuario.
   * @param username Nombre de usuario a buscar.
   * @returns El usuario encontrado.
   * @throws HttpException si el usuario no es encontrado.
   */
  async getUser(username: string) {
    const userFound = await this.userRepository.findOne({
      where: { username },
    });
    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return userFound;
  }
}

