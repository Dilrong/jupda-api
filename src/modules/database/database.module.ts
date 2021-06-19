import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '../config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        if (process.env.APP_ENV === 'testing') {
          return {
            type: 'mongodb',
            host: 'localhost',
            username: configService.get('TEST_DB_USERNAME'),
            passport: configService.get('TEST_DB_PASSWORD'),
            database: configService.get('TEST_DB_DATABASE'),
            port: 27017,
            dropSchema: true,
            synchronize: true,
            entities: [__dirname + './../**/**.entity{.ts,.js}'],
            keepConnectionAlive: true,
          } as TypeOrmModuleAsyncOptions;
        }
        return {
          type: 'mongodb',
          url: `mongodb+srv://${configService.get(
            'DB_USERNAME',
          )}:${configService.get('DB_PASSWORD')}@${configService.get(
            'DB_HOST',
          )}/${configService.get('DB_DATABASE')}?retryWrites=true&w=majority`,
          port: 27017,
          synchronize: true,
          logger: false,
          entities: [__dirname + './../**/**.entity{.ts,.js}'],
          keepConnectionAlive: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        } as TypeOrmModuleAsyncOptions;
      },
    }),
  ],
})
export class DataBaseModule {}
