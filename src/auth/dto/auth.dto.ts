/**
 * DTO (Data Transfer Object) para la autenticación de usuarios.
 * Se usa para transferir los datos de inicio de sesión desde el cliente al servidor.
 */
export class AuthPayloadDto {
  /** Nombre de usuario del usuario que intenta autenticarse */
  username: string;

  /** Contraseña del usuario */
  password: string;
}
