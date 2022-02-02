import { query, Request } from 'express';
import { diskStorage } from 'multer';

import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UploadedFile,
    UseInterceptors,
    Req,
    ParseIntPipe,
    UploadedFiles,
    Query,
    DefaultValuePipe,
    ValidationPipe,
} from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

import { fileMapper } from 'src/common/utils/file-mapper';
import { FastifyFileInterceptor } from 'src/common/interceptors/fastify-file-interceptor';
import {
    destinationResolve,
    editFileName,
    imageFileFilter,
    multiFilter,
    musicFileFilter,
} from 'src/common/utils/file-upload-util';

import { SongsService } from './songs.service';
import { SingleImageFileDto, SingleMusicFileDto } from 'src/common/dto/single-file-dto';
import { FastifyManyFilesInterceptor } from 'src/common/interceptors/fastify-many-files-interceptor';
import { MultiFiles, SongQueryParams } from './interfaces/song.interface';

@Controller('songs')
export class SongsController {
    constructor(private readonly songsService: SongsService) {}

    @Post()
    @UseInterceptors(
        FastifyManyFilesInterceptor([{ name: 'music' }, { name: 'image' }], {
            storage: diskStorage({
                destination: destinationResolve,
                filename: editFileName,
            }),
            fileFilter: multiFilter,
        }),
    )
    create(@Body() createSongDto: CreateSongDto, @UploadedFiles() files: MultiFiles) {
        console.log(createSongDto);

        return this.songsService.create({
            ...createSongDto,
            path: files.music[0].filename,
            cover: files.image && files.image[0].filename,
        });
    }

    @Post('upload/song')
    @UseInterceptors(
        FastifyFileInterceptor('music', {
            storage: diskStorage({
                destination: './files/music',
                filename: editFileName,
            }),
            fileFilter: musicFileFilter,
        }),
    )
    singleSong(@Req() req: Request, @UploadedFile() file: Express.Multer.File, @Body() body: SingleMusicFileDto) {
        return { ...body, music: fileMapper({ file, req }) };
    }

    @Post('upload/image')
    @UseInterceptors(
        FastifyFileInterceptor('image', {
            storage: diskStorage({
                destination: './files/images',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    singleImage(@Req() req: Request, @UploadedFile() file: Express.Multer.File, @Body() body: SingleImageFileDto) {
        return { ...body, image: fileMapper({ file, req }) };
    }

    @Get()
    findAll(
        @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: SongQueryParams['skip'],
        @Query('take', new DefaultValuePipe(5), ParseIntPipe) take: SongQueryParams['take'],
        @Query('artist', new DefaultValuePipe('')) artist: SongQueryParams['artist'],
        @Query('name', new DefaultValuePipe('')) name: SongQueryParams['name'],
    ) {
        return this.songsService.findAll({
            skip,
            take,
            artist,
            name,
        });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.songsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
        return this.songsService.update(+id, updateSongDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.songsService.remove(+id);
    }
    @Delete('delete/all')
    deleteAll() {
        return this.songsService.deleteAll();
    }
}
