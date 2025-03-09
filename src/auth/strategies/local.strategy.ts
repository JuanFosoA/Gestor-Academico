import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(); // Configuración predeterminada de Passport para la estrategia 'local'
  }

  /**
   * Método de validación de credenciales del usuario.
   * @param {string} username - Nombre de usuario ingresado.
   * @param {string} password - Contraseña ingresada.
   * @returns {Promise<any>} Retorna el usuario autenticado si las credenciales son correctas.
   * @throws {UnauthorizedException} Si el usuario no es válido o las credenciales son incorrectas.
   */
  async validate(username: string, password: string) {
    const user = await this.authService.validateUser({ username, password });
    if (!user) throw new UnauthorizedException('Credenciales incorrectas');
    return user; // Retorna el usuario autenticado
  }
}
