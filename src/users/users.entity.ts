import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Entidad que representa a los usuarios en el sistema.
 */
@Entity({ name: 'users' })
export class User {
  /**
   * Identificador único del usuario.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Nombre del usuario.
   */
  @Column()
  nombre: string;

  /**
   * Nombre de usuario único para autenticación.
   */
  @Column({ unique: true })
  username: string;

  /**
   * Contraseña del usuario.
   */
  @Column()
  password: string;
}
