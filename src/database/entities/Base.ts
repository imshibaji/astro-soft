import { Column } from "typeorm";

export class Base {
    @Column('datetime')
    createdAt?: Date;
    @Column('datetime')
    updatedAt?: Date;
}