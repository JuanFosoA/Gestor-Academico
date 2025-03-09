import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token JWT del encabezado Authorization (Bearer Token)
      ignoreExpiration: false, // No permite el uso de tokens expirados
      secretOrKey:
        '3462c20a13d79ed34862ddbd751d53f04584e14763905a3dace1cf26ad3060e4', // Clave secreta para validar el token
    });
  }

  /**
   * Método de validación del token JWT.
   * @param {any} payload - Contenido del token JWT decodificado.
   * @returns {any} Retorna la información del usuario si el token es válido.
   */
  validate(payload: any) {
    console.log('Inside JWT Strategy Validate'); // Depuración: muestra cuando se ejecuta la estrategia JWT
    console.log(payload); // Depuración: muestra el payload del token
    return payload; // Retorna el payload del token para ser accesible en las rutas protegidas
  }
}
