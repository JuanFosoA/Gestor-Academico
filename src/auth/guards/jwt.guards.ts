import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * Método que determina si una solicitud puede proceder.
   * Se ejecuta antes de que el controlador maneje la petición.
   * @param {ExecutionContext} context - Contexto de ejecución de la solicitud.
   * @returns {boolean | Promise<boolean> | Observable<boolean>} Retorna `true` si el usuario está autenticado, de lo contrario, lanza un error de autenticación.
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('Inside JWT AuthGuard canActivate'); // Depuración: indica que se está ejecutando el guard

    return super.canActivate(context); // Llama al método original para validar el token JWT
  }
}
