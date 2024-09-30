import { AppDataSource } from './data-source';
import { HouseLordMove } from './entities/HouseLordMove';
import { House } from './entities/House';
import { PlanetMove } from './entities/PlanetMove';
import { Nakshatra } from './entities/Nakshatra';
import { Planet } from './entities/Planet';
import { Rashi } from './entities/Rashi';
import { User } from './entities/User';


// Data Sources
export const AppDataManager = AppDataSource.manager;
export const AppDataSourceOptions = AppDataSource.options;
export const AppDataRepository = AppDataSource.getRepository;

// Repositories
export const HouseRepository = AppDataSource.getRepository(House);
export const HouseLordMoveRepository = AppDataSource.getRepository(HouseLordMove);
export const PlanetMoveRepository = AppDataSource.getRepository(PlanetMove);
export const NakshatraRepository = AppDataSource.getRepository(Nakshatra);
export const PlanetRepository = AppDataSource.getRepository(Planet);
export const RashiRepository = AppDataSource.getRepository(Rashi);

// Users Managements
export const UserRepository = AppDataSource.getRepository(User);


// Managers
export const HouseManager = HouseRepository.manager;
export const HouseLordMoveManager = HouseLordMoveRepository.manager;
export const PlanetMoveManager = PlanetMoveRepository.manager;
export const NakshatraManager = NakshatraRepository.manager;
export const PlanetManager = PlanetRepository.manager;
export const RashiManager = RashiRepository.manager;

// Users Managements
export const UserManager = UserRepository.manager;
