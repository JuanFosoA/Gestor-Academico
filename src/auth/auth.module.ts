import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule, // Módulo de autenticación para gestionar estrategias de Passport
    JwtModule.register({
      secret:
        '3462c20a13d79ed34862ddbd751d53f04584e14763905a3dace1cf26ad3060e4', // Clave secreta para la firma de tokens JWT
      signOptions: {
        expiresIn: '1h', // Expiración del token en 1 hora
      },
    }),
    UsersModule, // Importa el módulo de usuarios para gestionar la autenticación
  ],
  controllers: [AuthController], // Controlador encargado de manejar las rutas de autenticación
  providers: [AuthService, LocalStrategy, JwtStrategy], // Servicios y estrategias para autenticación
})
export class AuthModule {}
