import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guards';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guards';

@Controller('auth') // Define el prefijo de la ruta como '/auth'
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Maneja el inicio de sesión de los usuarios autenticados mediante el LocalGuard.
   * @param {Request} req - Objeto de la solicitud, que contiene la información del usuario autenticado.
   * @returns {any} Retorna la información del usuario autenticado.
   */
  @Post('login')
  @UseGuards(LocalGuard) // Aplica la estrategia de autenticación local
  login(@Req() req: Request) {
    return req.user; // Devuelve los datos del usuario autenticado
  }

  /**
   * Verifica el estado de autenticación del usuario autenticado con JWT.
   * @param {Request} req - Objeto de la solicitud, que contiene la información del usuario autenticado.
   * @returns {any} Retorna la información del usuario si la autenticación con JWT es válida.
   */
  @Get('status')
  @UseGuards(JwtAuthGuard) // Protege la ruta con el guard de JWT
  status(@Req() req: Request) {
    console.log('Inside Controller status method');
    console.log(req.user);
    return req.user; // Devuelve los datos del usuario autenticado con JWT
  }
}
