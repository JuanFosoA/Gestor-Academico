import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService, // Servicio para la gestión de usuarios
    private jwtService: JwtService, // Servicio para la generación de JWT
  ) {}

  /**
   * Valida un usuario verificando su nombre de usuario y contraseña.
   * @param {AuthPayloadDto} payload - Contiene el username y password del usuario.
   * @returns {Promise<string | undefined>} Retorna el token JWT si la autenticación es exitosa, de lo contrario, retorna `undefined`.
   */
  async validateUser({
    username,
    password,
  }: AuthPayloadDto): Promise<string | undefined> {
    // Busca al usuario en la base de datos por su username
    const userFound = await this.userService.getUser(username);

    // Verifica si la contraseña proporcionada coincide con la almacenada
    if (userFound.password === password) {
      const { password, ...user } = userFound; // Excluye la contraseña por seguridad
      return this.jwtService.sign(user); // Genera y retorna el token JWT
    }
  }
}
