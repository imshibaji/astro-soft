import { AppDataSource } from './data-source';
import { User } from './entities/User';


// Data Sources
export const AppDataManager = AppDataSource.manager;
export const AppDataSourceOptions = AppDataSource.options;
export const AppDataRepository = AppDataSource.getRepository;

// Users Managements
export const UserRepository = AppDataSource.getRepository(User);

// Users Managements
export const UserManager = UserRepository.manager;
