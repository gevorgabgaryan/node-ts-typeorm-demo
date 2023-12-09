import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "banks"})
export class Bank {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 255})
    name: string

}