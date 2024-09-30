import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('houses')
export class House {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    planetId!: number;

    @Column()
    nakshatraId!: number;

    @Column()
    rashiId!: number;
}