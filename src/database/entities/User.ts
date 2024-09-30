import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { Base } from "./Base";

@Entity('users')
export class User extends Base {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column('datetime', { nullable: true })
    emailVerifiedAt?: Date;

    @Column()
    password!: string;

    @Column({ nullable: true })
    rememberToken?: string;
}