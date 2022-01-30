import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryParams } from 'src/common/interfaces/query.interface';
import { ILike, Repository, UpdateResult } from 'typeorm';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './entities/playlist.entity';

@Injectable()
export class PlaylistsService {
    constructor(
        @InjectRepository(Playlist)
        private readonly playlistRepository: Repository<Playlist>,
    ) {}
    async create(createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
        return await this.playlistRepository.save(createPlaylistDto);
    }

    async findAll(query: QueryParams): Promise<[Playlist[], number]> {
        const { name, skip, take, withDeleted } = query;
        const nameCondition = name && { name: ILike(`%${name}%`) };
        return await this.playlistRepository.findAndCount({
            where: {
                ...nameCondition,
            },
            skip,
            take,
            withDeleted: withDeleted,
            relations: ['songs', 'creator', 'comments'],
        });
    }

    async findOne(id: number): Promise<Playlist> {
        return await this.playlistRepository.findOne(id, { relations: ['songs', 'creator', 'comments'] });
    }

    async update(id: number, updatePlaylistDto: UpdatePlaylistDto): Promise<Playlist> {
        const pl = await this.playlistRepository.findOne(id);

        await this.playlistRepository.save({ ...pl, ...updatePlaylistDto });

        return await this.playlistRepository.findOne(id, { relations: ['songs', 'creator', 'comments'] });
    }

    async remove(id: number): Promise<UpdateResult> {
        return await this.playlistRepository.softDelete(id);
    }
}
