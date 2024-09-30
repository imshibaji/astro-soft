import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export class PlanetMove {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    planetId!: number;

    @Column()
    houseId!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;
}