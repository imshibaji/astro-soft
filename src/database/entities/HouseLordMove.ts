import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('house_lord_moves')
export class HouseLordMove {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    houseId!: number;

    @Column()
    moveId!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;
}