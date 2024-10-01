import "reflect-metadata";
import { DataSource } from 'typeorm';
import { User } from './entities/User';

export const AppDataSource = new DataSource({
    type: "sqlite",
    // host: "localhost",
    // port: 3306,
    // username: "root",
    // password: "password",
    database: "./database/app.db",
    synchronize: true,
    logging: false,
    entities: [ 
        User,
    ],
    subscribers: [],
    migrations: [],
});