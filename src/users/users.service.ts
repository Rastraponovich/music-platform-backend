import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryParams } from 'src/common/interfaces/query.interface';
import { ILike, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.usersRepository.save(createUserDto);

        return await this.usersRepository.findOne(user);
    }

    async findAll(query: QueryParams): Promise<[User[], number]> {
        const { withDeleted, take, name, skip } = query;

        const nameCondition = name && { name: ILike(`%${name}%`) };
        return await this.usersRepository.findAndCount({
            withDeleted: withDeleted,
            relations: ['songs'],
            skip,
            take,
            where: { ...nameCondition },
        });
    }

    async findOne(id: number): Promise<User> {
        return await this.usersRepository.findOne(id);
    }

    async findByEmail(email: string): Promise<User> {
        return await this.usersRepository.findOne({ where: { email } });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.usersRepository.findOne(id);
        const updatedUser = await this.usersRepository.save({ ...user, ...updateUserDto });
        return await this.usersRepository.findOne(id);
    }

    async remove(id: number): Promise<UpdateResult> {
        return await this.usersRepository.softDelete(id);
    }
}
