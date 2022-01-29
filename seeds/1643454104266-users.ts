import { MigrationInterface, QueryRunner } from 'typeorm';

const users = [
    { name: 'Wilde', email: 'wilde@bk.ru', password: '1' },
    { name: 'test', email: 'test@test.ru', password: '1' },
];

export class users1643453545836 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        users.forEach(async (user) => {
            await queryRunner.manager.getRepository('users').save(user);
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        users.forEach(async (user) => {
            await queryRunner.manager.getRepository('users').delete(user.email);
        });
    }
}
