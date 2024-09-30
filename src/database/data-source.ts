import "reflect-metadata";
import { DataSource } from 'typeorm';
import { House } from './entities/House';
import { HouseLordMove } from './entities/HouseLordMove';
import { PlanetMove } from './entities/PlanetMove';
import { Nakshatra } from './entities/Nakshatra';
import { Planet } from './entities/Planet';
import { Rashi } from './entities/Rashi';
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
        House,
        HouseLordMove,
        PlanetMove,
        Nakshatra,
        Planet,
        Rashi,
        User,
    ],
    subscribers: [],
    migrations: [],
});