import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('nakshatras')
export class Nakshatra{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    planetId!: number;

    @Column()
    houseId!: number;

    @Column()
    firstPada!: string;

    @Column()
    secondPada!: string;

    @Column()
    thirdPada!: string;

    @Column()
    fourthPada!: string;
}