import { AppDataSource } from "@/database/data-source";
import { User } from "@/database/entities/User";
import { UserManager, UserRepository } from "@/database/repositories";

export async function createUser(user: User) {
    if(!AppDataSource.isInitialized) await AppDataSource.initialize();
    await UserManager.transaction(async (manager) => {
        // user.password = encrypt(user.password);
        user.createdAt = new Date();
        user.updatedAt = new Date();
        user = await manager.save(User, user);
    });
    return user;
}
  
export async function getUsers() {
    if(!AppDataSource.isInitialized) await AppDataSource.initialize();
    const users = await AppDataSource.manager.find(User);
    return users;
}

export async function getUserById(id: number) {
    if(!AppDataSource.isInitialized) await AppDataSource.initialize();
    const user = await AppDataSource.manager.findOneBy(User, {id});
    return user;
}

export async function getUserByEmail(email: string) {
    if(!AppDataSource.isInitialized) await AppDataSource.initialize();
    const user = await UserManager.findOneBy(User, {email});
    return user;
}

export async function getUserByCredentials(email: string, password: string) {
    if(!AppDataSource.isInitialized) await AppDataSource.initialize();
    const user = await UserManager.findOneBy(User, {email, password});
    return user;
}

export async function updateUserPassword(user: User, password: string) {
    if(!AppDataSource.isInitialized) await AppDataSource.initialize();
    // user.password = encrypt(password);
    user.password = password;
    user.updatedAt = new Date();
    await UserRepository.save(user);
    return user;
}

export async function updateUser(user: User) {
    if(!AppDataSource.isInitialized) await AppDataSource.initialize();
    user.updatedAt = new Date();
    await UserRepository.save(user);
    return user;
}

export async function deleteUser(user: User) {
    if(!AppDataSource.isInitialized) await AppDataSource.initialize();
    await UserRepository.remove(user);
    return user;
}

export async function deleteUserById(id: number) {
    if(!AppDataSource.isInitialized) await AppDataSource.initialize();
    const user = await AppDataSource.manager.findOneBy(User, {id});
    await AppDataSource.manager.remove(user);
    return user;
}