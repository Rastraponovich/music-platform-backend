import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository, UpdateResult } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song } from './entities/song.entity';
import { SongQueryParams } from './interfaces/song.interface';

@Injectable()
export class SongsService {
    constructor(
        @InjectRepository(Song)
        private readonly songsRepository: Repository<Song>,
    ) {}
    async create(createSongDto: CreateSongDto): Promise<Song> {
        return await this.songsRepository.save(createSongDto);
    }

    async findAll(query: SongQueryParams): Promise<[Song[], number]> {
        const { name, skip, artist, take, withDeleted } = query;

        const nameCondition = name && { name: ILike(`%${name}%`) };
        const artistCondition = artist && { artist: ILike(`%${artist}%`) };

        return await this.songsRepository.findAndCount({
            withDeleted: withDeleted,
            where: {
                ...nameCondition,
                ...artistCondition,
            },
            skip,
            take,
        });
    }

    async findOne(id: number): Promise<Song> {
        return await this.songsRepository.findOne(id);
    }

    async update(id: number, updateSongDto: UpdateSongDto): Promise<Song> {
        const song = await this.songsRepository.findOne(id);

        await this.songsRepository.save({ ...song, ...updateSongDto });
        return await this.songsRepository.findOne(id);
    }

    async remove(id: number): Promise<UpdateResult> {
        return await this.songsRepository.softDelete(id);
    }
    async deleteAll() {
        const songs = await this.songsRepository.find({ withDeleted: true });

        const ids = songs.map((song) => song.id);

        return await this.songsRepository.delete(ids);
    }
}
