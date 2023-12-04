import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Currency } from "./Currency";

@Entity({name: "accounts"})
export class Account {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:'varchar', length:255 })
    bankName: string

    @ManyToOne(()=> Currency, { cascade: true })
    @JoinColumn({name: 'currencyId'})
    currency: Currency

    @Column({type: 'int'})
    currencyId: number

    @Column({type:'varchar', length:255 })
    accontName: string

}