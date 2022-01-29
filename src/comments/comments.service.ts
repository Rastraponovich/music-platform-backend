import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryParams } from 'src/common/interfaces/query.interface';
import { ILike, Repository, UpdateResult } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentsRepository: Repository<Comment>,
    ) {}
    async create(createCommentDto: CreateCommentDto): Promise<Comment> {
        return await this.commentsRepository.save(createCommentDto);
    }

    async findAll(query: QueryParams): Promise<[Comment[], number]> {
        const { skip, withDeleted, name, take } = query;

        const authorCondition = name && { user: { name: ILike(`%${name}%`) } };

        return await this.commentsRepository.findAndCount({
            withDeleted: withDeleted,
            skip,
            take,
            where: { ...authorCondition },
        });
    }

    async findOne(id: number): Promise<Comment> {
        return await this.commentsRepository.findOne(id);
    }

    async update(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
        const comment = await this.commentsRepository.findOne(id);

        await this.commentsRepository.save({ ...comment, ...updateCommentDto });

        return await this.commentsRepository.findOne(id);
    }

    async remove(id: number): Promise<UpdateResult> {
        return await this.commentsRepository.softDelete(id);
    }
}
