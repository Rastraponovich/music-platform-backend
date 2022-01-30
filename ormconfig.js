module.exports = [
    {
        name: 'migrations',
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'master',
        password: 'super',
        database: 'music_dev',
        migrationsTableName: 'migrations',
        migrations: ['migrations/*.js'],
        cli: {
            migrationsDir: 'migrations',
        },
    },
    {
        name: 'seeds',
        type: 'postgres',
        host: 'localhost',
        username: 'master',
        password: 'super',
        port: 5432,
        entities: ['src/**/entities/*.entity.ts'],
        database: 'music_dev',
        migrations: ['seeds/*.ts'],
        cli: {
            migrationsDir: 'seeds',
        },
    },
];
