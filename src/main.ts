import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import compression from 'fastify-compress';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: true }));

    app.register(compression, { encodings: ['gzip', 'deflate'] });

    const configService = app.get(ConfigService);

    const port = configService.get('APP_PORT');

    await app.listen(port);
}
bootstrap();
