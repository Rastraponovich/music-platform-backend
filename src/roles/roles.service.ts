import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryParams } from 'src/common/interfaces/query.interface';
import { ILike, Repository, UpdateResult } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private readonly rolesRepository: Repository<Role>,
    ) {}

    async create(createRoleDto: CreateRoleDto): Promise<Role> {
        const role = await this.rolesRepository.save(createRoleDto);

        return await this.rolesRepository.findOne(role);
    }

    async findAll(query: QueryParams): Promise<[Role[], number]> {
        const { withDeleted, skip, name, take } = query;

        const conditonName = name && { name: ILike(`%${name}%`) };

        return await this.rolesRepository.findAndCount({
            withDeleted: withDeleted,
            take,
            skip,
            where: { ...conditonName },
        });
    }

    async findOne(id: number): Promise<Role> {
        return await this.rolesRepository.findOne(id);
    }

    async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
        const role = await this.rolesRepository.findOne(id);

        return await this.rolesRepository.save({ ...role, ...updateRoleDto });
    }

    async remove(id: number): Promise<UpdateResult> {
        return await this.rolesRepository.softDelete(id);
    }
}
