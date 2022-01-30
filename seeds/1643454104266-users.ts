import { MigrationInterface, QueryRunner } from 'typeorm';

const users = [
    { name: 'Wilde', email: 'wilde@bk.ru', password: '1' },
    { name: 'test', email: 'test@test.ru', password: '1' },
];

export class users1643453545836 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const roles: any = await queryRunner.manager.getRepository('roles').findOne({
            where: {
                altName: 'Admins',
            },
        });

        users.forEach(async (user) => {
            await queryRunner.manager.getRepository('users').save({ ...user, roleId: roles.id });
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const rep: any = await queryRunner.manager.getRepository('users').find();

        users.forEach(async (item) => {
            const id = rep.find((user) => user.email === item.email);
            await queryRunner.manager.getRepository('users').delete(id.id);
        });
    }
}
