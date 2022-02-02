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
import { Response } from 'express';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: true }), {
        cors: {
            origin: '*',
            allowedHeaders: '*',
        },
    });
    // app.register(compression, { encodings: ['gzip', 'deflate'] });
    app.useGlobalPipes(new ValidationPipe());
    app.useStaticAssets({
        root: join(__dirname, '../../files'),
    });

    // app.register(helmet, {
    //     contentSecurityPolicy: {
    //         directives: {
    //             defaultSrc: ['*'],
    //             styleSrc: [`'self'`, `'unsafe-inline'`],
    //             imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
    //             scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
    //             mediaSrc: ['*', 'data:', 'validator.swagger.io'],
    //         },
    //     },
    // });
    app.register(contentParser);

    const configService = app.get(ConfigService);

    const port = configService.get('APP_PORT');

    await app.listen(port);
}
bootstrap();
