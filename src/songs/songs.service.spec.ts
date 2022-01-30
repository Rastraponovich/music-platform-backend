import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { SongsService } from './songs.service';

import { Repository } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

export type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

export const createMockRepository = <T = any>(): MockRepository<T> => ({
    findOne: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    findAndCount: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
});

describe('SongsService', () => {
    let service: SongsService;
    let songsRepository: MockRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SongsService, { provide: getRepositoryToken(Song), useValue: createMockRepository() }],
        }).compile();

        service = module.get<SongsService>(SongsService);
        songsRepository = module.get<MockRepository>(getRepositoryToken(Song));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findOne', () => {
        describe('when song with ID exists', () => {
            it('should return the song object', async () => {
                const id = '1';
                const expectedSong = {};

                songsRepository.findOne.mockReturnValue(expectedSong);

                const song = await service.findOne(+id);

                expect(song).toEqual(expectedSong);
            });
        });
        describe('otherwise', () => {
            it('should throw the "NotFoundException"', async () => {
                const id = '1';
                songsRepository.findOne.mockReturnValue(undefined);

                try {
                    await service.findOne(+id);
                } catch (error) {
                    expect(error).toBeInstanceOf(NotFoundException);
                    expect(error.message).toEqual('');
                }
            });
        });
    });

    describe('create', () => {
        describe('when created song return object', () => {
            it('should return the song object after created', async () => {
                const expectedSong = {};

                const createSongDto: CreateSongDto = {
                    userId: null,
                    path: '',
                    name: '',
                    cover: '',
                    artist: '',
                    isActive: true,
                };

                songsRepository.save.mockReturnValue(expectedSong);

                const song = await service.create(createSongDto);

                expect(song).toEqual(expectedSong);
            });
        });
        describe('otherwise', () => {
            it('should throw the "NotFoundException"', async () => {
                songsRepository.save.mockReturnValue(undefined);
                const updateSongDto = { name: 'sadads' };

                try {
                    await service.create({} as CreateSongDto);
                } catch (error) {
                    expect(error).toBeInstanceOf(NotFoundException);
                    expect(error.message).toEqual('');
                }
            });
        });
    });

    describe('update', () => {
        describe('when song with ID exists update entity', () => {
            it('should return the song object after update', async () => {
                const id = '1';
                const expectedSong = {};

                const updateSongDto = { name: 'sadads' } as UpdateSongDto;

                songsRepository.findOne.mockReturnValue(expectedSong);
                songsRepository.save.mockReturnValue(updateSongDto);
                // songsRepository.findOne.mockReturnValue(expectedSong);

                const song = await service.update(+id, updateSongDto);
                expect(songsRepository.findOne).toBeCalledTimes(2);
                expect(song).toEqual(expectedSong);
            });
        });
        describe('otherwise', () => {
            it('should throw the "NotFoundException"', async () => {
                const id = '1';
                songsRepository.save.mockReturnValue(undefined);
                const updateSongDto = { name: 'sadads' } as UpdateSongDto;

                try {
                    await service.update(+id, updateSongDto);
                } catch (error) {
                    expect(error).toBeInstanceOf(NotFoundException);
                    expect(error.message).toEqual('');
                }
            });
        });
    });
});
