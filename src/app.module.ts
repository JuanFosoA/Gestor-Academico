import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeparmentsModule } from './deparments/deparments.module';
import {TypeOrmModule} from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'mi_usuario',
        password: 'hola123',
        database: 'gestor_academico',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true
    }),
    DeparmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
