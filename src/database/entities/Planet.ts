import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('planets')
export class Planet {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    aspect!: string;

    @Column()
    impact!: string;

    @Column()
    karak!: string;

    @Column()
    significance!: string;

    @Column()
    income!: string;

    @Column()
    rulingHouses!: string;

    @Column()
    transitTime!: string;

    @Column()
    friendlyHouses!: string;

    @Column()
    unfriendlyHouses!: string;

    @Column()
    neutralHouses!: string;

    @Column()
    friendlyPlanets!: string;

    @Column()
    neutralPlanets!: string;

    @Column()
    enemyPlanets!: string;

    @Column()
    exaltation!: string;

    @Column()
    debilition!: string;

    @Column()
    moolTrikona!: string;

    @Column()
    highlyExaltation!: string;
}