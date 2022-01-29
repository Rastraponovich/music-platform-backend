import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    DefaultValuePipe,
    ParseBoolPipe,
    ParseIntPipe,
    Query,
} from '@nestjs/common';
import { QueryParams } from 'src/common/interfaces/query.interface';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post()
    create(@Body() createCommentDto: CreateCommentDto) {
        return this.commentsService.create(createCommentDto);
    }

    @Get()
    findAll(
        @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: QueryParams['skip'],
        @Query('name', new DefaultValuePipe('')) name: QueryParams['name'],
        @Query('take', new DefaultValuePipe(5), ParseIntPipe) take: QueryParams['take'],
        @Query('withDeleted', new DefaultValuePipe(true), ParseBoolPipe) withDeleted: QueryParams['withDeleted'],
    ) {
        return this.commentsService.findAll({
            skip,
            name,
            take,
            withDeleted,
        });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.commentsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
        return this.commentsService.update(+id, updateCommentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.commentsService.remove(+id);
    }
}
