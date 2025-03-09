import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class NoAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    return true; // Permite el acceso a todas las rutas sin autenticación
  }
}
