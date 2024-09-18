import { LogLevel, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { config } from 'dotenv';
import * as fs from 'fs';
import * as os from 'os';
import { AppModule } from './app.module';
config();
const envConfig = dotenv.parse(fs.readFileSync('.env'));

async function bootstrap() {
  process.env.uv_threadpool_size = os.cpus().length.toString();
  for (const k in envConfig) {
    console.log(`${k}=${envConfig[k]}`);
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: process.env.CONFIG_LOGGER_LEVEL.split(',').filter((level: string): level is LogLevel => {
      return ['log', 'error', 'warn', 'debug', 'verbose'].includes(level as LogLevel);
    }),
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix('/api');

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
    }),
  );

  const config = new DocumentBuilder().setTitle('swagger').setDescription('swagger').setVersion('1').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  process.env.TZ = 'Asia/Ho_Chi_Minh';

  await app.listen(process.env.SERVICE_PORT);
  console.log(`Application is running on: ${await app.getUrl()}/api`);
}
bootstrap();
