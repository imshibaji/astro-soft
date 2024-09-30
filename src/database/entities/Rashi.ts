import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rashis")
export class Rashi {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    planetId!: number;

    @Column()
    houseId!: number;

    @Column()
    nakshatraId!: number;

    @Column()
    image!: string;

    @Column()
    type!: string;

    @Column()
    typeDescription!: string;

    @Column()
    element!: string;

    @Column()
    elementDescription!: string;

    @Column()
    significance!: string;

    @Column()
    attributes!: string;

    @Column()
    results!: string;

    @Column()
    degreeStart!: string;

    @Column()
    degreeEnd!: string;

    @Column()
    functionalBenefics!: string;

    @Column()
    functionalMalefics!: string;

    @Column()
    functionalDiedly!: string;
}