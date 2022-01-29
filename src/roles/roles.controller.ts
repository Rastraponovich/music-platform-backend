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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { QueryParams } from 'src/common/interfaces/query.interface';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Post()
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.rolesService.create(createRoleDto);
    }

    @Get()
    findAll(
        @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: QueryParams['skip'],
        @Query('name', new DefaultValuePipe('')) name: QueryParams['name'],
        @Query('take', new DefaultValuePipe(5), ParseIntPipe) take: QueryParams['take'],
        @Query('withDeleted', new DefaultValuePipe(true), ParseBoolPipe) withDeleted: QueryParams['withDeleted'],
    ) {
        return this.rolesService.findAll({ skip, name, take, withDeleted });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.rolesService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
        return this.rolesService.update(+id, updateRoleDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.rolesService.remove(+id);
    }
}
