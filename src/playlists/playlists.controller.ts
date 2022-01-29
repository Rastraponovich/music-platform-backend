import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    DefaultValuePipe,
    ParseIntPipe,
    ParseBoolPipe,
} from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { skip } from 'rxjs';
import { QueryParams } from 'src/common/interfaces/query.interface';

@Controller('playlists')
export class PlaylistsController {
    constructor(private readonly playlistsService: PlaylistsService) {}

    @Post()
    create(@Body() createPlaylistDto: CreatePlaylistDto) {
        return this.playlistsService.create(createPlaylistDto);
    }

    @Get()
    findAll(
        @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: QueryParams['skip'],
        @Query('name', new DefaultValuePipe('')) name: QueryParams['name'],
        @Query('take', new DefaultValuePipe(5), ParseIntPipe) take: QueryParams['take'],
        @Query('withDeleted', new DefaultValuePipe(true), ParseBoolPipe) withDeleted: QueryParams['withDeleted'],
    ) {
        return this.playlistsService.findAll({
            skip,
            name,
            take,
            withDeleted,
        });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.playlistsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
        return this.playlistsService.update(+id, updatePlaylistDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.playlistsService.remove(+id);
    }
}
