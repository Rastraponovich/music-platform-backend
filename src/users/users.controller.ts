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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryParams } from 'src/common/interfaces/query.interface';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    findAll(
        @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: QueryParams['skip'],
        @Query('name', new DefaultValuePipe('')) name: QueryParams['name'],
        @Query('take', new DefaultValuePipe(5), ParseIntPipe) take: QueryParams['take'],
        @Query('withDeleted', new DefaultValuePipe(true), ParseBoolPipe) withDeleted: QueryParams['withDeleted'],
    ) {
        return this.usersService.findAll({ skip, name, take, withDeleted });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
