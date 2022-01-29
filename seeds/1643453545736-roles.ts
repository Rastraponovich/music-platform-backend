import { MigrationInterface, QueryRunner } from 'typeorm';

const roles = [
    {
        name: 'Пользователи',
        altName: 'Users',
    },
    {
        name: 'Администраторы',
        altName: 'Admins',
    },
];

export class roles1643453545736 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        roles.forEach(async (role) => {
            await queryRunner.manager.getRepository('roles').save(role);
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        roles.forEach(async (role) => {
            await queryRunner.manager.getRepository('roles').delete(role);
        });
    }
}
