import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
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

    async findAll(): Promise<[Role[], number]> {
        return await this.rolesRepository.findAndCount({ withDeleted: true });
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
