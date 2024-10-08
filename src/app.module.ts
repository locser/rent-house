import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as moment from 'moment-timezone';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckModule } from './health-check/health-check.module';
import { AllExceptionsFilter } from './utils.common/utils.exception.common/all-exception-filter.response';
import { AppV1Module } from './v1/app.v1.module';
import { AuthGuard } from './v1/auth/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10 days' },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.CONFIG_MYSQL_HOST,
      port: parseInt(process.env.CONFIG_MYSQL_PORT),
      username: process.env.CONFIG_MYSQL_USERNAME,
      password: process.env.CONFIG_MYSQL_PASSWORD,
      database: process.env.CONFIG_MYSQL_DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      multipleStatements: true,
      dateStrings: true,
    }),
    HealthCheckModule,
    AppV1Module,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'moment-timezone',
      useValue: moment.tz.setDefault('GMT0'),
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
