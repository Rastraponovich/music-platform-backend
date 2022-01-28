import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { CommentsModule } from './comments/comments.module';
import { SongsModule } from './songs/songs.module';
import { RolesModule } from './roles/roles.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        UsersModule,
        RolesModule,
        SongsModule,
        CommentsModule,
        PlaylistsModule,
        AuthModule,
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => ({
                type: 'postgres',
                host: config.get('DB_HOST'),
                database: config.get('DB_NAME'),
                username: config.get('DB_USER'),
                password: config.get('DB_PASS'),
                port: config.get('DB_PORT'),
                synchronize: true,
                autoLoadEntities: true,
                logging: true,
            }),
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
