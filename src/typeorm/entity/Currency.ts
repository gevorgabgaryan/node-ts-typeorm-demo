import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "currencies"})
export class Currency {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 3})
    isoCode: string

    @Column({type:'varchar', length:255 })
    countryOrigin: string

    @Column({type: 'varchar', length: 2})
    signCharacter: string
}