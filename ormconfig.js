module.exports = [
    {
        name: "migrations",
        type: "postgres",
        host: "10.20.3.2",
        port: 5432,
        username: "admin",
        password: "1",
        database: "music_dev",
        migrationsTableName: "migrations",
        migrations: ["migrations/*.js"],
        cli: {
            migrationsDir: "migrations",
        },
    },
    {
        name: "seeds",
        type: "postgres",
        host: "10.20.3.2",
        port: 5432,
        username: "admin",
        entities: ["src/**/entities/*.entity.ts"],
        password: "1",
        database: "music_dev",
        migrations: ["seeds/*.ts"],
        cli: {
            migrationsDir: "seeds",
        },
    },
]
