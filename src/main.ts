import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import compression from 'fastify-compress';

import { contentParser } from 'fastify-multer';
import 'reflect-metadata';
import { join } from 'path';
import helmet from 'fastify-helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: true }));

    app.register(compression, { encodings: ['gzip', 'deflate'] });
    app.useGlobalPipes(new ValidationPipe());
    app.register(helmet, {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: [`'self'`],
                styleSrc: [`'self'`, `'unsafe-inline'`],
                imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
                scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
            },
        },
    });
    app.register(contentParser);
    app.useStaticAssets({ root: join(__dirname, '../../music-platform-backend/files') });

    const configService = app.get(ConfigService);

    const port = configService.get('APP_PORT');

    await app.listen(port);
}
bootstrap();
