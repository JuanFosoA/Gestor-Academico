import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class LocalGuard extends AuthGuard('local') {
  /**
   * Método que determina si una solicitud puede proceder.
   * Se ejecuta antes de que el controlador maneje la petición.
   * @param {ExecutionContext} context - Contexto de ejecución de la solicitud.
   * @returns {boolean | Promise<boolean> | Observable<boolean>} Retorna `true` si la autenticación con estrategia local es exitosa, de lo contrario, lanza un error de autenticación.
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context); // Llama al método original para validar credenciales con la estrategia 'local'
  }
}
